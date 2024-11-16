const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User")

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      buyOrSell,
      streetAddress,
      aptSuite,
      city,
      pincode,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
      paymentType,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No files uploaded.");
    }

    // Convert files to image data for database storage
    const imageData = listingPhotos.map((file) => ({
      data: file.buffer, // Binary data of the file
      contentType: file.mimetype, // MIME type, e.g., 'image/jpeg'
    }));

    // Create new listing
    const newListing = new Listing({
      creator,
      category,
      type,
      buyOrSell,
      streetAddress,
      aptSuite,
      city,
      pincode,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      imageData, // Save image data in the database
      title,
      description,
      highlight,
      highlightDesc,
      price,
      paymentType,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({ message: "Failed to create listing", error: err.message });
    console.error(err);
  }
});

router.get("/image/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing || !listing.imageData || listing.imageData.length === 0) {
      return res.status(404).send("Image not found.");
    }

    // Send the first image as an example
    const image = listing.imageData[0];

    res.set("Content-Type", image.contentType); // Set the content type (e.g., 'image/jpeg')
    res.send(image.data); // Send the binary image data
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve image", error: err.message });
    console.error(err);
  }
});


/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category

  try {
    let listings
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator")
    } else {
      listings = await Listing.find().populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})

 
router.get('/property-search', async (req, res) => {
  try {
    // Find all listings and sort by 'promoted' field, putting promoted listings at the top
    const allListings = await Listing.find()
      .populate('creator')
      .sort({ promoted: -1 }); // Sort by 'promoted' in descending order

    res.status(200).json(allListings); // Send sorted listings
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params

 
  try {

    let listings = []

    if (search === "all") {
      listings = await Listing.find().populate("creator").sort({ promoted: -1 })
    } else {
      listings = await Listing.find({
        $or: [
          { category: {$regex: search, $options: "i" } },
          { title: {$regex: search, $options: "i" } },
        ]
      }).populate("creator").sort({ promoted: -1 })
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params
   
    const listing = await Listing.findById(listingId).populate("creator")
    res.status(202).json(listing)
  } catch (err) {
    res.status(404).json({ message: "Listing can not found!", error: err.message })
  }
})
 
router.delete('/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;
    
    console.log("the delete id is"+ listingId) 
    const result = await Listing.findByIdAndDelete(listingId);
    console.log(result)
    
    if (!result) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
