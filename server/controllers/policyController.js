const Policy = require('../models/policy');

const getPolicy = async (req, res) => {
  const policy = await Policy.findOne({ policyName: req.params.name });
  if (policy) {
    res.json(policy);
  } else {
    res.status(404);
    throw new Error('Policy not found');
  }
};
const createPolicy = async (req, res) => {
  const { name } = req.params;
  const { policyDescription } = req.body;

  const policyExists = await Policy.findOne({ policyName: name });

  if (policyExists) {
    res.status(400);
    throw new Error('Policy already exists');
  }

  const newPolicy = new Policy({
    policyName: name,
    policyDescription: policyDescription
  });

  const savedPolicy = await newPolicy.save();

  res.status(201).json(savedPolicy);
};

const updatePolicy = async (req, res) => {
    const policy = await Policy.findOne({ policyName: req.params.name });
  
    if (policy) {
      policy.policyDescription = req.body.policyDescription || policy.policyDescription;
  
      const updatedPolicy = await policy.save();
  
      res.json({
        policyName: updatedPolicy.policyName,
        policyDescription: updatedPolicy.policyDescription
      });
    } else {
      res.status(404);
      throw new Error('Policy not found');
    }
  };

module.exports = { getPolicy, createPolicy, updatePolicy };