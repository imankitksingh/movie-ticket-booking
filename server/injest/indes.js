import { Inngest } from "inngest";
import User from "../models/User.js";

// a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// inngest funtions to add userdata into mongoDB database
const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            image: image_url
        }

        await User.create(userData)
    }
)

// inngest funtions to delete userdata into mongoDB database
const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data
        await User.findByIdAndDelete(id)
    }
)

// inngest funtions to update userdata into mongoDB database
const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" }, // Triggered when user is updated in Clerk
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const updatedUserData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            image: image_url
        };
        await User.findByIdAndUpdate(id, updatedUserData);
    }
);

// empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
