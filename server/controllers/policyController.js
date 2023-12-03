const Policy = require('../models/policy');
const getPolicies = async (req, res, next) => {
  try {
    const policies = await Policy.find({});
    res.json(policies);
  } catch (error) {
    next(error);
  }
};

const getPolicy = async (req, res, next) => {
  try {
    const policy = await Policy.findOne({ policyName: req.params.name });
    if (policy) {
      res.json(policy);
    } else {
      res.status(404);
      throw new Error('Policy not found');
    }
  } catch (error) {
    next(error);
  }
};

const createPolicy = async (req, res, next) => {
  try {
    const { name, policyDescription } = req.body;

    const policyExists = await Policy.findOne({ policyName: name });

    if (policyExists) {
      return res.status(400).json({ message: 'Policy already exists' });
    }

    const newPolicy = new Policy({
      policyName: name,
      policyDescription: policyDescription
    });

    const savedPolicy = await newPolicy.save();

    res.status(201).json(savedPolicy);
  } catch (error) {
    next(error);
  }
};

const updatePolicy = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = { getPolicy, createPolicy, updatePolicy, getPolicies };