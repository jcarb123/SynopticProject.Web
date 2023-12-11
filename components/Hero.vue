<template>
  <div
    class="text-white text-center py-20 mb-10 flex flex-col justify-center h-96 rounded-b-[6rem] bg-sky-800"
  >
    <div class="absolute top-5 right-5 flex items-center">
      <button
        v-if="isAuthenticated"
        @click="toggleProfileModal"
        class="px-4 py-4 mr-4 rounded font-bold text-xl bg-white transform hover:scale-105 duration-450 text-sky-800"
      >
        <i class="fas fa-user"></i>
      </button>
      <div
        v-if="isProfileModalVisible && isAuthenticated"
        class="absolute top-16 right-5 w-64 bg-white shadow-lg rounded p-4 z-50 text-black"
      >
        <div class="flex flex-col space-y-2">
          <p><strong>Email Address</strong> {{ user.value.name }}</p>
          <button
            @click="toggleProfileModal"
            class="mt-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mx-16"
          >
            Close
          </button>
        </div>
      </div>
      <button
        v-if="!isAuthenticated"
        @click="login"
        class="px-8 py-4 rounded font-bold text-2xl bg-white transform hover:scale-105 duration-450 text-sky-800"
      >
        Log In
      </button>
      <button
        v-else
        @click="logout"
        class="px-8 py-4 rounded font-bold text-2xl bg-white transform hover:scale-105 duration-450 text-sky-800"
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
          class="py-2 px-2 w-[40rem] h-14 text-black text-xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import "@fortawesome/fontawesome-free/css/all.css";

const emit = defineEmits(["search"]);
const searchTerm = ref("");
const isProfileModalVisible = ref(false);

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
  isProfileModalVisible.value = !isProfileModalVisible.value;
};
</script>
