const ListingModel = require('../models/listings');
const Listing = require('../models/listings')
const jwt = require('jsonwebtoken');
const RoleModel = require('../models/roleModel');

const createListing = async (req, res) => {
    try {
        const listing = new Listing(req.body);
        await listing.save()
        res.status(201).json({success: "Your listing has been created."})
    } catch (error) {
        console.error(error)
        res.status(401).json({error: "Error while creating a listing."})
    }
}

const getListings = async (req, res) => {

    if(req.body._id.toString() === req.params.id){
        try {
            const listings = await Listing.find({userRef: req.params.id}).exec()
            return res.status(200).json(listings)
        } catch (error) {
            console.log(error);
            res.status(401).json({error: 'Error getting the listing'})
        }
    } else {
        res.status(401).json({notFound: 'No listings found'})
    }
}

const deleteListing = async(req, res) => {
    const listing = await Listing.findOne({_id: req.params.id}).exec()
    if(!listing){
        return res.status(404).json({error: "Listing not found!"})
    }
    console.log(req.body.roles.name)
    if(req.body.roles.name === 'admin' || req.body._id.toString() === listing.userRef.toString()){
        try {
            await Listing.findByIdAndDelete(req.params.id)
            return res.status(200).json({success: 'Listing has been successfully deleted'})
        } catch (error) {
            console.log(error)
            return res.status(400).json({error: "Error deleting the property"})
        }
    }
    if(req.body._id.toString() !== listing.userRef.toString()){
        return res.status(404).json({error: "Unauthorized user"})
    }
}

const updateListing = async (req, res) => {
    const { token } = req.cookies
    try {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            if(err) throw err;

            const listing = await Listing.findById(req.params.id);
            if (!listing) {
                return res.status(404).json({error: "Listing not found!"})
            }
            if (user._id !== listing.userRef.toString()) {
                return res.status(404).json({error: "Unauthorized user"})
            }

            try {
            const updatedListing = await Listing.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            ).exec()
            
            res.status(200).json(updatedListing);
            } catch (error) {
                console.error(error)
                res.status(400).json({error: "Error fetching the listings."});
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({error: "Error fetching the listings."});
    }
};

const getOneListing = async(req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            res.status(404).json({error: "Listing not found"})
        }
        res.status(200).json(listing)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: "Error fetching the listing"})
    }
}

const getAllListings = async(req, res) => {
    try {

        let limit = parseInt(req.query.limit) || 9;

        const startIndex = parseInt(req.query.startIndex) || 0;

        let purpose = req.query.purpose;
        if(purpose === undefined || purpose === 'all'){
            purpose = { $in: ['sell', 'rent'] }
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            title: { $regex: searchTerm, $options: 'i' },
            purpose: purpose
          }).sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex).exec();
         
        console.log(listings.length)

        res.status(200).json(listings)

    } catch (error) {
        res.status(404).json({error: "Error fetching the user"})
    }
}

module.exports = {
    createListing,
    getListings,
    deleteListing,
    updateListing,
    getOneListing,
    getAllListings
}