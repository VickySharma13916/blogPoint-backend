const client = require("../models/client");

const postImage = async (req, res) => {
  try {
    let clientImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        clientImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: clientImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postClientData = async (req, res) => {
  const { clientName, clientFeedback, clientAddress, clientImage } = req.body;
  try {
    const newClient = new client({
      clientName: clientName,
      clientFeedback: clientFeedback,
      clientImage: clientImage,
      ...(clientAddress && { clientAddress }),
    });
    const savedClient = await newClient.save();
    res.status(200).json(savedClient);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getClient = async (req, res) => {
  try {
    // Fetch data from the "client" collection and sort it by "createdAt" in descending order.
    const data = await client.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await client.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClientById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const { clientAddress } = req.body;

    let transformedclientAddress;
    if (clientAddress && clientAddress.length > 0) {
      transformedclientAddress = clientAddress;
    }
    updates.clientAddress = transformedclientAddress;
    const updatedData = await client.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await client.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getClient,
  getClientById,
  updateClientById,
  deleteClientById,
  postImage,
  postClientData,
};
