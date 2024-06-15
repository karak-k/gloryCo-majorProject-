const Order = require("../models/orderModels");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create new order 
exports.newOrder = catchAsyncErrors(async(req,res,next)=> {
    const { 
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice} = req.body;

        const order = await Order.create({
        shippingInfo, 
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
        });

        res.status(201).json({
            success:true,
            order
        });
});

// get an Order details 
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user" , "name email");
    if(!order){
        return next(new ErrorHandler(`Order not found with Id: ${req.params.id}` , 404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});


// get all the orders of an user 
exports.myOrders = catchAsyncErrors(async(req,res,next) => {
    const orders = await Order.find({user:req.user._id});
    
    res.status(200).json({
        success:true,
        orders,
    });

});


// get all orders -- (ADMIN)
exports.getAllOrders = catchAsyncErrors(async(req,res,next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    
    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
});


// update a order -- (ADMIN)
exports.updateOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`Order not found with Id: ${req.params.id}` , 404));
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already this item",400));
    }
    order.orderItems.forEach(async(item) => {
        await updateStock(item.product,item.quantity);
    })
    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    
    await order.save({validateBeforeSave : false});
    res.status(200).json({
        success:true,
    });
});


async function updateStock(id , quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}



// delete order -- (ADMIN)
exports.deleteOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`Order not found with Id: ${req.params.id}` , 404));
    }
    await order.deleteOne();
    
    res.status(200).json({
        success:true,
    });
});
