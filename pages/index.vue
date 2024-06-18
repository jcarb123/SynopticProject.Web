<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-brand-primary-blue text-white px-4"
  >
    <div class="text-center mb-12 relative">
      <h2 class="text-5xl md:text-7xl font-bold mb-20">
        Enter your <br />
        <span class="text-brand-primary-yellow">Shop Code</span> below
      </h2>
      <div class="flex flex-col space-y-4 md:space-y-8 relative">
        <div class="flex justify-center space-x-4 md:space-x-8">
          <div
            v-for="(digit, index) in digits"
            :key="index"
            class="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 flex items-center justify-center border-4 rounded-3xl bg-white text-black shadow-md"
            :class="{
              'border-red-500': error && !loading,
              'border-green-500': success && !loading,
            }"
          >
            <template v-if="loading">
              <div class="loader"></div>
            </template>
            <template v-else-if="error">
              <i
                class="fas fa-times text-4xl md:text-5xl text-red-500"
                style="font-size: 5em"
              ></i>
            </template>
            <template v-else-if="success">
              <i
                class="fas fa-check text-4xl md:text-5xl text-green-500"
                style="font-size: 5em"
              ></i>
            </template>
            <template v-else>
              <input
                v-model="digits[index]"
                @input="handleInput(index)"
                @keydown.backspace="handleBackspace(index, $event)"
                @focus="selectInput"
                maxlength="1"
                class="w-full h-full text-5xl md:text-7xl lg:text-8xl text-center bg-transparent focus:outline-none"
                type="text"
                pattern="\d*"
                inputmode="numeric"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="shopName && success"
      class="text-3xl text-green-500 mb-4 font-semibold"
    >
      Welcome to {{ shopName }}!
    </div>
    <div class="w-full max-w-md text-center mt-8">
      <button
        :disabled="!digitsFilled || error || success || loading"
        @click="validateShopCode"
        class="bg-brand-primary-yellow text-black py-4 md:py-6 px-6 md:px-14 text-2xl md:text-3xl rounded-2xl hover:opacity-85 disabled:opacity-50 font-bold"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "nuxt/app";
// import axios from "axios"; // Uncomment when API is available

definePageMeta({
  layout: "shop-code-layout",
});

const router = useRouter();

const digits = ref(["", "", "", ""]);
const error = ref(false);
const success = ref(false);
const loading = ref(false);
const previousDigits = ref([...digits.value]);
const errorMessage = ref("");
const shopName = ref("");

const shops = [
  { code: "1234", name: "Shop 1" },
  { code: "5678", name: "Shop 2" },
  { code: "9012", name: "Shop 3" },
];

const digitsFilled = computed(() =>
  digits.value.every((digit) => digit !== "")
);

const handleInput = (index: number) => {
  if (!/^\d*$/.test(digits.value[index])) {
    digits.value[index] = digits.value[index].replace(/\D/g, "");
  }

  if (digits.value[index].length > 1) {
    digits.value[index] = digits.value[index].slice(0, 1);
  }
  if (index < 3 && digits.value[index] !== "") {
    nextTick(() => {
      (
        document.querySelectorAll("input")[index + 1] as HTMLInputElement
      ).focus();
    });
  }
  resetError();
};

const handleBackspace = (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace" && digits.value[index] === "" && index > 0) {
    nextTick(() => {
      (
        document.querySelectorAll("input")[index - 1] as HTMLInputElement
      ).focus();
    });
  }
  resetError();
};

const selectInput = (event: Event) => {
  (event.target as HTMLInputElement).select();
};

const validateShopCode = async () => {
  loading.value = true;
  previousDigits.value = [...digits.value];
  const shopCode = digits.value.join("");

  // Uncomment and use this when API is available
  // try {
  //   const response = await axios.post("YOUR_API_ENDPOINT", { shopCode });
  //   if (response.data.valid) {
  //     error.value = false;
  //     success.value = true;
  //     shopName.value = response.data.shopName; // Assuming the API returns the shop name
  //     errorMessage.value = "";
  //     setTimeout(() => {
  //       loading.value = false;
  //       setTimeout(() => {
  //         router.push({ name: "StaffPage", query: { shopCode } });
  //       }, 2000); // Show the green ticks for 2 seconds before redirecting
  //     }, 500);
  //   } else {
  //     throw new Error("Invalid shop code");
  //   }
  // } catch (err) {
  //   handleValidationError();
  // }

  // Placeholder logic for validation
  const shop = shops.find((shop) => shop.code === shopCode);
  if (shop) {
    error.value = false;
    success.value = true;
    shopName.value = shop.name; // Get shop name from the shop object
    errorMessage.value = "";
    setTimeout(() => {
      loading.value = false;
      setTimeout(() => {
        router.push({ name: "StaffPage", query: { shopCode } });
      }, 2000); // Show the green ticks for 2 seconds before redirecting
    }, 500);
  } else {
    handleValidationError();
  }
};

const handleValidationError = () => {
  error.value = true;
  success.value = false;
  shopName.value = "";
  errorMessage.value = "Invalid shop code. <br> Please try again.";
  setTimeout(() => {
    loading.value = false;
    setTimeout(() => {
      digits.value = [...previousDigits.value];
    }, 2000); // Show the red crosses for 2 seconds before allowing re-entry
  }, 500);
};

const resetError = () => {
  if (error.value || success.value) {
    error.value = false;
    success.value = false;
    errorMessage.value = "";
  }
};

const closeError = () => {
  error.value = false;
};

watch(digits, () => {
  if (error.value || success.value) {
    resetError();
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #00558f;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
