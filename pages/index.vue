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
        <div
          class="flex flex-wrap justify-center space-x-2 sm:space-x-4 md:space-x-8"
        >
          <div
            v-for="(digit, index) in digits"
            :key="index"
            class="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 flex items-center justify-center border-4 rounded-3xl bg-white text-black shadow-md m-1 sm:m-2"
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
                class="fas fa-times text-5xl md:text-6xl text-red-500"
                style="font-size: 6em"
              ></i>
            </template>
            <template v-else-if="success">
              <i
                class="fas fa-check text-5xl md:text-6xl text-green-500"
                style="font-size: 6em"
              ></i>
            </template>
            <template v-else>
              <input
                v-model="digits[index]"
                @input="handleInput(index)"
                @keydown.backspace="handleBackspace(index, $event)"
                @focus="selectInput"
                maxlength="1"
                class="w-full h-full text-6xl md:text-8xl lg:text-9xl text-center bg-transparent focus:outline-none placeholder-gray-300"
                type="text"
                pattern="\d*"
                inputmode="numeric"
                :placeholder="placeholders[index]"
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
        class="bg-brand-primary-yellow text-black py-4 md:py-6 px-6 md:px-14 text-2xl md:text-3xl rounded-2xl hover:opacity-85 disabled:opacity-50 font-semibold"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "nuxt/app";

definePageMeta({
  layout: "shop-code-layout",
});

const router = useRouter();

const digits = ref(["", "", "", ""]);
const placeholders = ref(["0", "0", "0", "0"]);
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

  if (!/^\d{4}$/.test(shopCode)) {
    handleValidationError();
    return;
  }

  const shop = shops.find((shop) => shop.code === shopCode);
  if (shop) {
    error.value = false;
    success.value = true;
    shopName.value = shop.name;
    errorMessage.value = "";
    localStorage.setItem("shopCode", shopCode);
    setTimeout(() => {
      loading.value = false;
      setTimeout(() => {
        router.push({ name: "StaffPage", query: { shopCode } });
      }, 2000);
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
    }, 2000);
  }, 500);
};

const resetError = () => {
  if (error.value || success.value) {
    error.value = false;
    success.value = false;
    errorMessage.value = "";
  }
};

// Retrieve the shop code from local storage and populate the digits
onMounted(() => {
  const storedShopCode = localStorage.getItem("shopCode");
  if (storedShopCode) {
    digits.value = storedShopCode.split("");
  }
});

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
