import Estate from "../models/Estate.js";

export const getCollection = async (req, res) => {
  try {
    const estate = await Estate.find();

    if (estate) {
      return res.json(estate);
    }
  } catch (error) {
    return res.status(402).json({
      message: "Estate not found",
      ok: 402,
    });
  }
};
export const getEstate = async (req, res) => {
  try {
    const estateId = String(req.params.id).slice(
      1,
      String(req.params.id).length,
    );

    const estate = await Estate.findById(estateId);

    if (estate) {
      return res.json(estate);
    }
  } catch (error) {
    return res.status(402).json({
      message: "Estate not found",
      ok: 402,
    });
  }
};
