"use client";

import {
  actionChangePassword,
  actionDeleteAccount,
  actionEditAccount,
} from "@/lib/action";
import { useEffect, useState } from "react";

export default function SettingsForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  function cancelEditing() {
    setName(user.name);
    setImage(user.image);
    setPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  }
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal information.
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>

        <form action={actionEditAccount} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              required
              maxLength={80}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Profile picture URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={!isEditing}
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter a URL for your profile picture.
            </p>
          </div>

          {isEditing && (
            <div className="flex justify-end border-t border-gray-100 pt-5">
              <button
                type="submit"
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Save changes
              </button>
            </div>
          )}
        </form>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            Change your account password.
          </p>
        </div>

        {user.hashedPassword ? (
          <form action={actionChangePassword} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isEditing}
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!isEditing}
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Confirm your new password"
              />
            </div>

            {isEditing && confirmPassword.length > 0 && (
              <p
                className={`text-sm ${
                  passwordsMatch ? "text-green-600" : "text-red-500"
                }`}
              >
                {passwordsMatch
                  ? "Passwords match."
                  : "Passwords do not match."}
              </p>
            )}

            <div className="flex justify-end border-t border-gray-100 pt-5">
              <button
                type="submit"
                disabled={!isEditing || !passwordsMatch}
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              >
                Change password
              </button>
            </div>
          </form>
        ) : (
          <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
            You signed in using an external provider, such as Google. Password
            changes are not available for this account.
          </p>
        )}
      </section>

      {/* DANGER ZONE */}
      <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-red-600">Danger zone</h2>
        <p className="mt-2 text-sm text-gray-500">
          Permanently delete your account and its associated data. This action
          cannot be undone.
        </p>

        <form
          action={actionDeleteAccount}
          onSubmit={(e) => {
            if (
              !window.confirm(
                "Are you sure you want to permanently delete your account?"
              )
            ) {
              e.preventDefault();
            }
          }}
          className="mt-5 flex justify-end"
        >
          <button
            type="submit"
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete account
          </button>
        </form>
      </section>
    </div>
  );
}
