<script setup lang="ts">

</script>

<template>
  <div class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style='font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;'>
    <div class="layout-container flex h-full grow flex-col">
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f2f2f2] px-10 py-3">
        <div class="flex items-center gap-4 text-[#141414]">
          <div class="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 class="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">ConnectU</h2>
        </div>
        <div class="flex flex-1 justify-end gap-8">
          <button
              class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f2f2f2] text-[#141414] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <div class="text-[#141414]" data-icon="Bell" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                ></path>
              </svg>
            </div>
          </button>
          <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_roMEMANktxC-TNfOzSv247Z27tiBPoFur4169XFTvDKB_DrzeKUuhntI74ox8TMTxFgllodAFye59WCIqioEkCfq6qjCA98BlyLS8MSWPB5akUqLzVRTSN_lAP6MU2_qczb__u8wpYeGPwcKfxfHQP-u70At7rOVR60vruBm5CdmudDsFi9nlnS5pHeB4UBmAjlcVeI6EH7fHo0n4c9O3NEgcdsACuXtcHCn6ME6Imvls_SQUUm1eLQ7ntP2UP8PmkFVHSbrp9o");'
          ></div>
        </div>
      </header>
      <div class="px-40 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div class="flex flex-wrap justify-between gap-3 p-4"><p class="text-[#141414] tracking-light text-[32px] font-bold leading-tight min-w-72">Notifications</p></div>
          <h3 class="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Today</h3>
          <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfmo5ukykLy_fPjZpRjTQVVjtgRfEi0sjCfoCELOZgDhswPCoOH_XuC9Q03D9_wAQbLVZYxVr0Fl5JYThPdAJkHsHa0soe4VdtgGUGyiCPZ9yQbvIwMVANBOAWq1he8HjFwNg1zqr5FUFD9yZEdAAM0Di2aggicc2AWidq7yxKinp4fY6baZbhw0bQxWxAb90SI7osFNsuqulTMHGOGVaemFUgCaJtDgNmPyTRd54ZBqW-aeyPWHaG1w0gvHDlgUa3iCewC-4oB_8");'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-[#141414] text-base font-medium leading-normal line-clamp-1">Sarah posted a new photo</p>
              <p class="text-[#757575] text-sm font-normal leading-normal line-clamp-2">10m ago</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAc7OTCstHiuoBmM5GIHWGIW0lFH02tY4e1vVGUwJIJy0zXgTOM1yHRjtqzjYpb5Zhqn4UTkplhn22mn1xg0_0emGYDTbS2KRDV5wEL3X7KbxJSPP0rc0-TjOOHf0i7zSrXug0bV4A9rVWK8wwCzTAlocZO2RMaRraS2mTohkEF5Llpkd1ulyMJBlDXKO4ofJ8NVXcuvXeTch3I-qnI-jtuSaHelZL5QSv6SpuGoROY3Oenq-aMp1Oyzos5UoijFVTYoRkTwy1xMhA");'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-[#141414] text-base font-medium leading-normal line-clamp-1">Liam commented on your post</p>
              <p class="text-[#757575] text-sm font-normal leading-normal line-clamp-2">20m ago</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbj7QatwhPQA49tucT_ZQzxR4keBbtO3KhocUtJynkCv45p4l6qXnl-oqtUpdE9nJ6O4JfSGyjfy7uIc7sbha_z9MC1A3wT6BA-__AwVpVfpXaHPGzjFQTFBijv_G9-w8csbMqoJjIbdYuRqYouOeJF1OElkYlSxqnB1Nb80T-6PoJnKq0wWwGpeC2QWSWdj8K7_l8SlDFLOQd10waogHsfwYqvLKAqaq_G9_qUup6eEkwhpGVAZkrGzC1qfBZC3qOiqH7EIQ0Ug8");'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-[#141414] text-base font-medium leading-normal line-clamp-1">Sophia liked your post</p>
              <p class="text-[#757575] text-sm font-normal leading-normal line-clamp-2">30m ago</p>
            </div>
          </div>
          <h3 class="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Yesterday</h3>
          <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsgxnbugYXvPZ1EqmjLeYWBUax3ZN1n7Mn1l44_fdQT9AfJ7tAAMTejeWe6MvQ4ih6CZAj835E1MIgRHL8AjHSgcLAWh3rQeyWP52iGALRxxsXwo2XhlW2NAKJ8JusdTWm-LF6Yt4lWf_ltBs2SfS_h1HrMLexVe1lS66b_p6Czz6MU54V1AlbpelX9lelPKvhAEkSayVCJS1XoRyyB-HfMxyApx4mqHvndJmsBr90iLug6W9hisEvSkSzQdhA9E7rJp-68DwhgT8");'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-[#141414] text-base font-medium leading-normal line-clamp-1">Ethan mentioned you in a comment</p>
              <p class="text-[#757575] text-sm font-normal leading-normal line-clamp-2">1d ago</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYcnEv0C5faKimc79ijh_UzjqnC9uyFU_Qdeqk-WHZPHOZAZSn4rwcapRO7zJJThut29wDbKMxYa6lRisFOIBc1CQIxqTAb7UaxVHUQScoSyK6UkmcBoCPEY7mGgd9H84JDE7Da70k9uEdsXKe8gvLq1hVjwZCrxHWOuIdkapFLNszClU8GOOqAHMNzTm85yDWpI-5tTlIrgl_Dp-XBB8mSL1RYja2Od9Vp4oBGF2mwcChsaDg_lk-a2FJMWutxPV5sud0kw4GyJA");'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-[#141414] text-base font-medium leading-normal line-clamp-1">Olivia shared your post</p>
              <p class="text-[#757575] text-sm font-normal leading-normal line-clamp-2">1d ago</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
                class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuFTBepnZHAQ9Myqjy6SRXRhD8cr_afJw77xWw2_iVInJB9aXQ2HO9sCBBlZzfWtZ6CuhjTlu6EYM4VvoKR7VCRQOTgC5QX1AVX6IiuG5OBgVrtj48mKD0E3Nmr3N2HaBzpmndQWnmRVh8K9iX-v-yKVdrDx9IKcEJvpN6qd8qoECEfDZOVkSCIXCwDS7Q14ea-RzZ6w04fZirBVOqBr1PDF-n1snNiinzqgjssEj6W3IuuyyiHmHdiqppb1mF9GPxjHPpL5_ZV-s");'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-[#141414] text-base font-medium leading-normal line-clamp-1">Noah liked your comment</p>
              <p class="text-[#757575] text-sm font-normal leading-normal line-clamp-2">1d ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>