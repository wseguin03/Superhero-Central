const Dispute = require('../models/dispute');

// Create a new dispute
// Create a new dispute
exports.createDispute = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const existingDispute = await Dispute.findOne({ review: reviewId });

        if (existingDispute) {
            return res.status(400).json({ error: 'A dispute for this review already exists' });
        }

        const dispute = new Dispute({ ...req.body, review: reviewId });
        const savedDispute = await dispute.save();
        res.json(savedDispute);
    } catch (error) {
        res.status(500).json({ error: 'Could not save dispute' });
    }
};

// Get all disputes by review id
exports.getDispute = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const disputes = await Dispute.findOne({ review: reviewId });
        res.json(disputes);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch disputes' });
    }
};

// Update a dispute by review id
exports.updateDispute = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedDispute = await Dispute.findOneAndUpdate({ review: reviewId }, req.body, { new: true });
        res.json(updatedDispute);
    } catch (error) {
        res.status(500).json({ error: 'Could not update dispute' });
    }
};// Delete a dispute by review id
exports.deleteDispute = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const dispute = await Dispute.findOneAndDelete({ review: reviewId });

    if (!dispute) {
      return res.status(404).json({ error: 'No dispute found with this reviewId' });
    }

    res.json({ message: 'Dispute deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete dispute' });
  }
};