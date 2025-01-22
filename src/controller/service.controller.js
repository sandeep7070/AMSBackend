import asyncHandler from '../utility/asyncHandlers.js';
import { Service } from '../models/service.model.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utility/cloudinary.js';

const cleanId = id => id?.replace(':', '').trim();

const createService = asyncHandler(async (req, res) => {
    const { title, description, category, price } = req.body;
    const file = req.file;

    if (!title?.trim() || !description?.trim()) {
        throw new Error("Title and description are required");
    }

    let coverImage = '';
    if (file) {
        const result = await uploadOnCloudinary(file);
        coverImage = result?.url;
        if (!coverImage) throw new Error("Image upload failed");
    }

    const service = await Service.create({
        title: title.trim(),
        description: description.trim(),
        category,
        price,
        coverImage,
        status: 'active'
    });

    res.status(201).json({
        success: true,
        message: "Service created successfully",
        service
    });
});

const getAllServices = asyncHandler(async (req, res) => {
    const { 
        page = 1, 
        limit = 10, 
        category, 
        status,
        search,
        sort = 'createdAt'
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const services = await Service.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(+limit)
        .lean();

    const total = await Service.countDocuments(query);

    res.status(200).json({
        success: true,
        services,
        pagination: {
            page: +page,
            total,
            pages: Math.ceil(total / limit)
        }
    });
});

const getServiceById = asyncHandler(async (req, res) => {
    const id = cleanId(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid service ID format");
    }

    const service = await Service.findById(id)
        .select('-__v')
        .lean();

    if (!service) throw new Error("Service not found");

    res.status(200).json({
        success: true,
        service
    });
});

const updateService = asyncHandler(async (req, res) => {
    const id = cleanId(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid service ID format");
    }

    const updates = { ...req.body };
    if (req.file) {
        const result = await uploadOnCloudinary(req.file);
        if (result?.url) updates.coverImage = result.url;
    }

    const service = await Service.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!service) throw new Error("Service not found");

    res.status(200).json({
        success: true,
        message: "Service updated successfully",
        service
    });
});

const deleteService = asyncHandler(async (req, res) => {
    const id = cleanId(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid service ID format");
    }

    const service = await Service.findById(id);
    if (!service) throw new Error("Service not found");

    await Service.softDelete(id);

    res.status(200).json({
        success: true,
        message: "Service deleted successfully"
    });
});

const toggleServiceStatus = asyncHandler(async (req, res) => {
    const id = cleanId(req.params.id);
    const { status } = req.body;

    if (!['active', 'inactive', 'pending'].includes(status)) {
        throw new Error("Invalid status value");
    }

    const service = await Service.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!service) throw new Error("Service not found");

    res.status(200).json({
        success: true,
        message: "Service status updated",
        service
    });
});

export {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    toggleServiceStatus
};