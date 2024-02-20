<template>
<AutoQueryGrid type="Booking"
     selected-columns="id,name,roomType,roomNumber,bookingStartDate,bookingEndDate,cost,couponId,discount"
     :header-titles="{ roomNumber:'Room No', bookingStartDate:'Start Date', bookingEndDate:'End Date', couponId:'Coupon' }"
     :visible-from="{ roomNumber:'lg', bookingEndDate:'xl', cost:'md', couponId:'xl', discount:'never' }" />

  <div class="my-8 flex justify-center gap-x-4">
    <SrcPage path="admin/bookings.vue" />
  </div>
</template>

