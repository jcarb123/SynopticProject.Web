<template>
  <div
    class="text-white text-center py-20 mb-10 flex flex-col justify-center h-96 rounded-b-[6rem] bg-sky-800"
  >
    <div class="absolute top-5 right-5 flex items-center">
      <div
        v-if="
          isCompleteOrderModalVisible && isAuthenticated && basketCount !== 0
        "
        class="absolute top-20 right-16 w-64 bg-white shadow-lg rounded-xl p-4 z-50 text-black"
      >
        <button
          @click="finishOrder"
          class="w-full mt-1 bg-sky-800 text-white rounded px-4 py-2 text-lg"
        >
          Complete Order
        </button>
      </div>
      <button
        v-if="basketCount !== 0"
        @click="toggleCompleteOrderModal"
        class="px-4 py-4 mr-4 rounded font-bold text-xl bg-white transform scale-105 duration-450 text-sky-800 flex items-center hover:bg-gray-300"
      >
        <i class="fas fa-shopping-basket"></i>
        <span class="ml-2">({{ basketCount }})</span>
      </button>

      <button
        v-if="isAuthenticated"
        @click="toggleProfileModal"
        class="px-4 py-4 mr-4 rounded font-bold text-xl bg-white transform scale-105 duration-450 text-sky-800 hover:bg-gray-300"
      >
        <i class="fas fa-user"></i>
      </button>
      <div
        v-if="isProfileModalVisible && isAuthenticated"
        class="absolute top-20 right-16 w-64 bg-white shadow-lg rounded-xl p-4 z-50 text-black"
      >
        <div class="flex flex-col space-y-2">
          <p><strong>Email Address</strong> {{ user.value.name }}</p>
        </div>
      </div>
      <button
        v-if="!isAuthenticated"
        @click="login"
        class="px-8 py-4 rounded font-bold text-2xl bg-white transform duration-450 text-sky-800 hover:bg-gray-300"
      >
        Log In
      </button>
      <button
        v-else
        @click="logout"
        class="px-8 py-4 rounded font-bold text-2xl bg-white transform hover:bg-gray-300 duration-450 text-sky-800"
      >
        Log Out
      </button>
    </div>

    <h1 class="text-8xl font-bold mb-6">Products</h1>
    <div class="flex justify-center mt-6">
      <div class="flex border-2 border-white rounded items-center">
        <span class="px-2">
          <i class="fa fa-search text-2xl"></i>
        </span>
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Search our products"
          class="py-2 px-2 w-[40rem] h-14 text-black text-xl"
          maxlength="50"
        />
      </div>
    </div>
  </div>
  <div
    v-if="showOrderCompletedPopup"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
  >
    <div class="bg-white p-32 rounded-lg shadow-xl text-center">
      <p class="text-7xl font-bold text-sky-800">
        Order Completed Successfully!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { eventBus, completeOrder } from "../event/eventBus.js";
import "@fortawesome/fontawesome-free/css/all.css";
import { authoriseCompleteOrder } from "../services/orderService";

const config = useRuntimeConfig().public;

const emit = defineEmits(["search"]);
const searchTerm = ref("");
const isProfileModalVisible = ref(false);
const isCompleteOrderModalVisible = ref(false);
const basketCount = ref(0);
const canCompleteOrder = ref(false);
const showOrderCompletedPopup = ref(false);

const updateBasketCount = (newCount) => {
  basketCount.value = newCount;
};

onMounted(() => {
  eventBus.on("update-basket", updateBasketCount);
});

onUnmounted(() => {
  eventBus.off("update-basket", updateBasketCount);
});

watch(searchTerm, (newValue) => {
  emit("search", newValue);
});

const auth0 = process.client ? useAuth0() : undefined;

const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value;
});

const user = computed(() => auth0?.user);

const login = () => {
  auth0?.checkSession();
  if (!auth0?.isAuthenticated.value) {
    auth0?.loginWithRedirect({
      appState: {
        target: useRoute().path,
      },
    });
  }
};

const logout = () => {
  auth0?.logout({
    logoutParams: { returnTo: window.location.origin },
  });
};

const toggleProfileModal = () => {
  if (isCompleteOrderModalVisible.value) {
    isCompleteOrderModalVisible.value = false;
  }
  isProfileModalVisible.value = !isProfileModalVisible.value;
};

const toggleCompleteOrderModal = () => {
  if (isProfileModalVisible.value) {
    isProfileModalVisible.value = false;
  }
  isCompleteOrderModalVisible.value = !isCompleteOrderModalVisible.value;
};

const finishOrder = async () => {
  if (isAuthenticated.value) {
    const token = await auth0.getAccessTokenSilently();
    canCompleteOrder.value = await authoriseCompleteOrder(config, token);

    if (canCompleteOrder.value) {
      completeOrder();
      toggleCompleteOrderModal();

      showOrderCompletedPopup.value = true;

      setTimeout(() => {
        showOrderCompletedPopup.value = false;
      }, 5000);
    }
  }
};
</script>
