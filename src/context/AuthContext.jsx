import React, { createContext, useContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password, name) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            xp: 0,
            level: 1,
            currentStreak: 0,
            longestStreak: 0,
            lastLoginDate: serverTimestamp(),
            accuracy: 0,
            totalAnswered: 0,
            createdAt: serverTimestamp()
        });

        return user;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    // Streak Logic Check
    const checkStreak = async (uid, data) => {
        if (!data.lastLoginDate) return;

        const lastLogin = data.lastLoginDate.toDate();
        const today = new Date();

        // Reset time parts to compare dates only
        lastLogin.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(today - lastLogin);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Consecutive day login
            const newStreak = (data.currentStreak || 0) + 1;
            const newLongest = Math.max(newStreak, data.longestStreak || 0);

            await updateDoc(doc(db, "users", uid), {
                currentStreak: newStreak,
                longestStreak: newLongest,
                lastLoginDate: serverTimestamp()
            });
        } else if (diffDays > 1) {
            // Streak broken
            await updateDoc(doc(db, "users", uid), {
                currentStreak: 1,
                lastLoginDate: serverTimestamp()
            });
        } else {
            // Same day login, just update timestamp if needed or do nothing
            await updateDoc(doc(db, "users", uid), {
                lastLoginDate: serverTimestamp()
            });
        }
    };

    useEffect(() => {
        let unsubscribeSnapshot = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                const docRef = doc(db, "users", user.uid);

                // Real-time listener for user data
                unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);
                        checkStreak(user.uid, data);
                    } else {
                        // Fallback: Create user doc if missing
                        const newUserProps = {
                            name: user.displayName || "User",
                            email: user.email,
                            xp: 0,
                            level: 1,
                            currentStreak: 0,
                            longestStreak: 0,
                            lastLoginDate: serverTimestamp(),
                            accuracy: 0,
                            totalAnswered: 0,
                            createdAt: serverTimestamp()
                        };
                        setDoc(docRef, newUserProps);
                        // No need to set data here, the snapshot listener will fire again
                    }
                });
            } else {
                setUserData(null);
                // Unsubscribe from snapshot if user logs out
                if (unsubscribeSnapshot) {
                    unsubscribeSnapshot();
                    unsubscribeSnapshot = null;
                }
            }
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        };
    }, []);

    const value = {
        currentUser,
        userData,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
