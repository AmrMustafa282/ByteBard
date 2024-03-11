import express from "express";

import {
 updateUser,
 deleteUser,
 signout,
 getUsers,
 banUser,
//  banUserByAdmin,
//  deleteUserByAdmin,
} from "./../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.put("/ban/:userId", verifyToken, banUser);

// router.put('/ban/:userToBanId/:userId',verifyToken,banUserByAdmin)
// router.delete('/delete/:userToDeleteId/:userId', verifyToken, deleteUserByAdmin)
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);

export default router;
