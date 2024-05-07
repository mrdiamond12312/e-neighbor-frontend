export default {
  'order.management.table.col.createdAt': 'Created At',
  'order.management.table.col.productName': 'Product Name',
  'order.management.table.col.userName': 'User Name',
  'order.management.table.col.orderValue': 'Order Value',
  'order.management.table.col.deliveryAddress': 'Delivery Address',
  'order.management.table.col.rentalPeriod': 'Rental Period',
  'order.management.table.col.status': 'Status',
  'order.management.table.col.status.filter.field.PENDING': 'PENDING',
  'order.management.table.col.status.filter.field.APPROVED': 'APPROVED',
  'order.management.table.col.status.filter.field.IN PROGRESS': 'IN PROGRESS',
  'order.management.table.col.status.filter.field.COMPLETED': 'COMPLETED',
  'order.management.table.col.status.filter.field.CANCELED': 'CANCELED',
  'order.management.table.col.status.filter.field.REJECTED': 'REJECTED',
  'order.management.table.col.rentalPeriod.from-to': '{rentTime} to {returnTime}',
  'order.status.PENDING': 'PENDING',
  'order.status.APPROVED': 'APPROVED',
  'order.status.IN PROGRESS': 'IN PROGRESS',
  'order.status.COMPLETED': 'COMPLETED',
  'order.status.CANCELED': 'CANCELED',
  'order.status.REJECTED': 'REJECTED',
  'order.management.table.col.shopName': 'Shop name',
  'order.management.table.col.actions': 'Actions',

  // Order
  'order.detail.modal.header': 'Details of Order #{orderId}',
  'lessor.order.detail.modal.navigate.approve': 'Approve Rental Order',
  'lessor.order.detail.modal.navigate.return': 'Upload Rental Return Images',
  'lessor.order.detail.modal.navigate.reject': 'Reject Rental Order',
  'order.details.step.payment': 'Make Rental Order and Pay',
  'order.details.step.lessorAccept': 'Awaiting Lessor Approval',
  'order.details.step.delivery': 'Rented Item in Delivery',
  'order.details.step.complete': 'Rental Completed',
  'lessor.order.detail.viewProduct': 'View Product',
  'lessor.order.detail.chatAction': 'Chat with {userName}',
  'order.detail.deliveryInfo.header': 'Delivery Information',
  'order.detail.image.upon.deliveryAndReturn': 'Inspection Images',
  'order.detail.image.upon.deliveryAndReturn.button': 'View Inspection and Return Images',
  'order.detail.pricingInfo.header': 'Payment Information',
  'order.detail.pricingInfo.period': 'Rental Period',
  'order.detail.pricingInfo.period.value': 'From {rentTime} to {returnTime}',
  'order.detail.pricingInfo.numOfPaidDay': 'Number of Paid Days',
  'order.detail.pricingInfo.numOfPaidDay.value': '{numberOfPaidDay} days',
  'order.detail.pricingInfo.rentalPrice': 'Rental Price',
  'order.detail.pricingInfo.total': 'Total Payment',
  'order.detail.pricingInfo.paymentStatus': 'Payment Status',
  'order.detail.pricingInfo.paymentStatus.COMPLETE': 'PAID',
  'order.detail.pricingInfo.online': '(Via Online Payment Gateway)',

  // User Order Details
  'order.management.table.col.action.view-detail': 'View Order Details',
  'order.management.table.col.action.feedback': 'Leave a Feedback',
  'order.management.table.col.action.canceling': 'Cancel Order',
  'order.detail.modal.navigate.feedback': 'Leave a Feedback',
  'order.detail.modal.navigate.receipt': 'Submit Receipt Photos',
  'order.detail.modal.navigate.cancel': 'Cancel Order!',
  'order.detail.viewProduct': 'View Product',
  'order.detail.lessorPage': 'View {shopName} Shop',
  'order.detail.chatAction': 'Chat with {shopName}',

  // Approve Modal
  'lessor.orders.approve.header': 'Approving Order #{orderId}',
  'lessor.orders.approve.check.question': 'Are you sure to accept this order?',
  'lessor.order.detail.modal.button.approve': 'Approve this Order',
  'lessor.orders.approve.submit.success': 'Successfully approved order #{orderId}!',
  'lessor.order.detail.modal.info.approved':
    'This order has been APPROVED by you! Please ask the user to upload a receipt image upon this property delivery to proceed',

  'user.orders.receipt.fields.conditionUponReceipt.null':
    'Please enter the product condition upon delivery',
  'user.orders.receipt.fields.imagesUponReceipt.null': 'Please take a photo',
  'user.orders.receipt.fields.isDeliveredOnTime.true': 'On time',
  'user.orders.receipt.fields.isDeliveredOnTime.false': 'Late',
  'user.orders.receipt.header': 'Add receipt evidence for order #{orderId}',
  'user.order.receipt.check.question': 'Add evidence that the product was delivered and undamaged',
  'user.orders.receipt.fields.isDeliveredOnTime.label': 'Delivered',
  'user.orders.receipt.fields.conditionUponReceipt.label': 'Condition',
  'user.orders.receipt.fields.imagesUponReceipt.label': 'Evidence',
  'user.order.receipt.button.submit': 'Submit receipt!',
  'user.orders.receipt.submit.success': 'Successfully add a Receipt for order #{orderId}!',

  // Return Modal
  'lessor.orders.return.fields.conditionUponReturn.null':
    'Please enter product condition after rental!',
  'lessor.orders.receipt.fields.imagesUponReturn.null': 'Select a photo!',
  'lessor.orders.return.header': 'Complete order #{orderId}',
  'lessor.order.return.check.question': 'Let us know the product condition after rental',
  'lessor.orders.return.fields.isReturnedOnTime.label': 'Return',
  'lessor.orders.return.fields.conditionUponReturn.label': 'Condition',
  'lessor.orders.return.fields.imagesUponReturn.label': 'Evidence',
  'lessor.order.return.button.submit': 'Submit evidence and complete this order!',
  'user.orders.return.submit.success': 'Successfully complete order #{orderId}!',

  // Feedback Modal
  'user.orders.feedback.fields.content.null':
    'Please leave a short review about this Rental experience',
  'user.orders.feedback.fields.star.null': 'Please provide a rating',
  'user.orders.feedback.header': 'Feedback for Order #{orderId}',
  'user.order.feedback.check.question': 'Leave a review to help others understand this product!',
  'user.orders.feedback.fields.star.label': 'Rating',
  'user.orders.feedback.fields.content.label': 'Comment',
  'user.orders.feedback.fields.image.label': 'Photo',
  'user.order.feedback.button.submit': 'Submit Review!',
  'user.orders.feedback.submit.success': 'Order #{orderId} Feedback submitted successfully!',

  // Reject Modal
  'lessor.orders.reject.fields.rejectReason.null': 'Please enter a rejection reason',
  'lessor.orders.reject.header': 'Reject Order #{orderId}',
  'lessor.orders.reject.check.question': 'Confirm order rejection',
  'lessor.orders.reject.fields.rejectReason.label': 'Reason',
  'lessor.order.reject.button.submit': 'Submit Order Rejection',
  'lessor.orders.reject.submit.success': 'Successfully reject order #{orderId}',

  // Cancel Modal
  'user.orders.cancel.header': 'Cancel Order #{orderId}',
  'user.orders.cancel.check.question': 'Confirm order cancellation?',
  'user.order.cancel.button.submit': 'Confirm Cancellation!',
  'user.orders.cancel.submit.success': 'Order #{orderId} canceled successfully!',
};
