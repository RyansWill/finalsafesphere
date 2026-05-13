import prisma from "../lib/prisma.js";

export const createTrack = async (req, res) => {
  const {
    trackingNumber,
    shipperName,
    shipperPhone,
    shipperAddress,
    shipperEmail,
    receiverName,
    receiverPhone,
    receiverAddress,
    receiverEmail,
    typeofShipment,
    weight,
    packages,
    productName,
    paymentMode,
    carrier,
    origin,
    destination,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    courier,
    mode,
    quatity,
    totalFreight,
    carrierReferenceNo,
    height,
    width,
    length,
    dateModified,
    time,
    location,
    status,
    remarks,
  } = req.body;
  try {
    const newTrack = await prisma.trackInfo.create({
      data: {
        ...req.body,
        statusOrigin: "Order Received",
        locationOrigin: req.body.location,
        dateOrigin: req.body.dateModified,
        timeOrigin: req.body.time,
      },
    });
    console.log(newTrack);
    res.status(201).json({ message: "Track created sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: " Failed to create tracking data " });
  }
};

export const getTracks = async (req, res) => {
  try {
    const trackInfos = await prisma.trackInfo.findMany();
    res.status(200).json(trackInfos);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: " Failed to fetch tracking data " });
  }
};

export const getTrack = async (req, res) => {
  const { trackingNumber } = req.body;

  if (!trackingNumber) {
    return res.status(400).json({ message: "Tracking number is required" });
  }

  try {
    // 1. Create a timeout promise
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database timeout")), 8000) // 8 seconds
    );

    // 2. Race the Prisma query against the timeout
    const trackInfo = await Promise.race([
      prisma.trackInfo.findUnique({
        where: { trackingNumber },
      }),
      timeout
    ]);

    if (!trackInfo) {
      return res.status(404).json({ message: "Wrong Tracking number" });
    }

    return res.status(200).json(trackInfo);

  } catch (err) {
    console.error("DATABASE ERROR:", err.message);
    
    if (err.message === "Database timeout") {
       return res.status(504).json({ message: "Server is waking up, please try again in 10 seconds." });
    }
    
    return res.status(500).json({ message: "A database error occurred" });
  }
};

export const updateTrack = async (req, res) => {
  const { id: _, ...Data } = req.body;
  const trakingdata = Data
  console.log(trakingdata);
  try {
    const updatedTrack = await prisma.trackInfo.update({
      where: { trackingNumber:trakingdata.trackingNumber },
      data:trakingdata,
    });

    res.status(200).json(updatedTrack);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: " Failed to update tracking data " });
  }
};

export const deleteTrack = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.trackInfo.delete({
      where: { id },
    });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(404).json({ message: " Failed to delete this info " });
  }
};
