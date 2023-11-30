<template>
  <div
    class="text-white text-center py-20 mb-10 flex flex-col justify-center h-96 rounded-b-3xl relative"
    style="background-color: #00558f"
  >
    <div class="absolute top-5 right-5 flex items-center">
      <button
        v-if="isAuthenticated"
        @click="toggleProfileModal"
        class="px-4 py-2 mr-4 rounded font-bold text-xl bg-white transform hover:scale-105 duration-450"
        style="color: #00558f"
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
        class="px-4 py-2 rounded font-bold text-xl bg-white transform hover:scale-105 duration-450"
        style="color: #00558f"
      >
        Log In
      </button>
      <button
        v-else
        @click="logout"
        class="px-4 py-2 rounded font-bold text-xl bg-white transform hover:scale-105 duration-450"
        style="color: #00558f"
      >
        Log Out
      </button>
    </div>

    <h1 class="text-8xl font-bold mb-4">Products</h1>
    <div class="flex justify-center mt-6">
      <div class="flex border-2 border-white rounded">
        <input
          v-model="searchTerm"
          type="search"
          class="px-4 py-2 w-80 h-16 text-black text-2xl"
          placeholder="Search for a product..."
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
    returnTo: 'https://zealous-mud-0b8b86403.4.azurestaticapps.net/'
  });
};

const toggleProfileModal = () => {
  isProfileModalVisible.value = !isProfileModalVisible.value;
};
</script>
