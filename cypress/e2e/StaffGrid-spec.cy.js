// describe("Staff Grid Component", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000"); // Replace with your app's URL

//     // Inject initial staff data
//     cy.window().then((win) => {
//       win.__app__.$root.$emit("update:paginatedStaffList", [
//         { id: 1, name: "Alice", role: "Manager" },
//         { id: 2, name: "Bob", role: "Staff" },
//         { id: 3, name: "Charlie", role: "Staff" },
//         { id: 4, name: "Dave", role: "Manager" },
//       ]);
//     });
//     cy.reload();
//   });

//   it("displays the correct number of staff cards for different screen sizes", () => {
//     // Desktop view (lg)
//     cy.viewport("macbook-15");
//     cy.get(".grid > div").should("have.length", 4);

//     // Tablet view (md)
//     cy.viewport("ipad-2");
//     cy.get(".grid > div").should("have.length", 4);

//     // Mobile view (sm)
//     cy.viewport("iphone-6");
//     cy.get(".grid > div").should("have.length", 4);
//   });

//   it('shows the "No staff found" message when the list is empty', () => {
//     // Set the staff list to empty and reload
//     cy.window().then((win) => {
//       win.__app__.$root.$emit("update:paginatedStaffList", []);
//     });
//     cy.reload();

//     cy.viewport("macbook-15");
//     cy.contains("No staff found. Please try again later.").should("be.visible");

//     cy.viewport("ipad-2");
//     cy.contains("No staff found. Please try again later.").should("be.visible");

//     cy.viewport("iphone-6");
//     cy.contains("No staff found. Please try again later.").should("be.visible");
//   });

//   it("emits select event when a staff card is clicked", () => {
//     cy.get(".grid > div").first().click();
//     cy.window().then((win) => {
//       expect(win.__app__.$root.$emit).to.have.been.calledWith("selectStaff");
//     });
//   });
// });
