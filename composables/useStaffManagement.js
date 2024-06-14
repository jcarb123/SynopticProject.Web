export function useStaffManagement() {
  const showModal = ref(false);
  const newStaff = ref({ name: "", role: "" });
  const staffList = ref([
    { id: 1, name: "Alice Walker", role: "Shop Manager" },
    { id: 2, name: "Bob Green", role: "Supervisor" },
    { id: 3, name: "Charlie Brown", role: "Team Member" },
    { id: 4, name: "Daisy Miller", role: "Senior Team Member" },
    { id: 5, name: "Ethan Johnson", role: "Team Member" },
    { id: 6, name: "Fiona Davis", role: "Supervisor" },
    { id: 7, name: "George Wilson", role: "Senior Team Member" },
    { id: 8, name: "Hannah White", role: "Team Member" },
    { id: 9, name: "Ivy Robinson", role: "Guest" },
    { id: 10, name: "Jack Thompson", role: "Senior Team Member" },
    { id: 11, name: "Kelly Martinez", role: "Team Member" },
    { id: 12, name: "Liam Harris", role: "Team Member" },
    { id: 13, name: "Mia King", role: "Guest" },
    { id: 14, name: "Noah Anderson", role: "Supervisor" },
  ]);

  const masterRoles = [
    "Shop Manager",
    "Supervisor",
    "Team Member",
    "Senior Team Member",
    "Guest",
  ];

  const selectedStaffId = ref(null);
  const selectedRole = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(8);

  const updateItemsPerPage = () => {
    if (window.innerWidth >= 1024) {
      itemsPerPage.value = 8;
    } else {
      itemsPerPage.value = 6;
    }
  };

  const uniqueRoles = computed(() => {
    const roles = staffList.value.map((staff) => staff.role);
    const uniqueRolesSet = new Set([...roles, ...masterRoles]);
    return Array.from(uniqueRolesSet);
  });

  const filteredStaffList = computed(() => {
    if (!selectedRole.value) {
      return staffList.value;
    }
    return staffList.value.filter((staff) => staff.role === selectedRole.value);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredStaffList.value.length / itemsPerPage.value);
  });

  const paginatedStaffList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredStaffList.value.slice(start, end);
  });

  const isSubmitDisabled = computed(() => {
    return !newStaff.value.name || !newStaff.value.role;
  });

  const addColleague = () => {
    staffList.value.push({ ...newStaff.value, id: Date.now() });
    newStaff.value = { name: "", role: "" };
    showModal.value = false;
  };

  const handleCloseModal = () => {
    newStaff.value = { name: "", role: "" };
    showModal.value = false;
  };

  const removeStaff = () => {
    if (selectedStaffId.value) {
      const index = staffList.value.findIndex(
        (staff) => staff.id === selectedStaffId.value
      );
      if (index !== -1) {
        staffList.value.splice(index, 1);
        selectedStaffId.value = null;
        if (currentPage.value > 1 && paginatedStaffList.value.length === 0) {
          currentPage.value--;
        }
      }
    }
  };

  watch(filteredStaffList, () => {
    currentPage.value = 1;
  });

  onMounted(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateItemsPerPage);
  });

  return {
    showModal,
    newStaff,
    staffList,
    selectedStaffId,
    selectedRole,
    currentPage,
    uniqueRoles,
    totalPages,
    paginatedStaffList,
    isSubmitDisabled,
    addColleague,
    handleCloseModal,
    removeStaff,
    itemsPerPage,
  };
}
