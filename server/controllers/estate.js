import Estate from "../models/Estate.js";
import EstatePrices from "../models/EstatePrices.js";
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
    const estateId = String(req.params.id);

    const estate = await Estate.findById(estateId).populate("additionalPrices");

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
