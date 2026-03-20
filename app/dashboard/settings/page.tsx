'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  UserCircleIcon,
  SunIcon,
  BellIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function Page() {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Settings
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <div className="rounded-xl bg-gray-50 p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCircleIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Profile</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="settings-name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="settings-name"
                name="name"
                type="text"
                defaultValue="User"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="settings-email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="settings-email"
                name="email"
                type="email"
                defaultValue="user@nextmail.com"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="settings-password" className="mb-2 block text-sm font-medium">
                New Password
              </label>
              <input
                id="settings-password"
                name="password"
                type="password"
                placeholder="Enter new password"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </div>

        {/* Preferences */}
        <div className="rounded-xl bg-gray-50 p-6">
          <div className="flex items-center gap-2 mb-6">
            <SunIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Preferences</h2>
          </div>
          <form className="space-y-4">
            {/* Theme */}
            <div>
              <label htmlFor="theme" className="mb-2 block text-sm font-medium">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                defaultValue="light"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className="mb-2 block text-sm font-medium">
                <span className="flex items-center gap-1">
                  <LanguageIcon className="w-4 h-4" />
                  Language
                </span>
              </label>
              <select
                id="language"
                name="language"
                defaultValue="en"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                <span className="flex items-center gap-1">
                  <BellIcon className="w-4 h-4" />
                  Notifications
                </span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="email-notifications"
                    name="email_notifications"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="email-notifications" className="text-sm text-gray-700">
                    Email notifications
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="push-notifications"
                    name="push_notifications"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="push-notifications" className="text-sm text-gray-700">
                    Push notifications
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="marketing-emails"
                    name="marketing_emails"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="marketing-emails" className="text-sm text-gray-700">
                    Marketing emails
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 rounded-xl border-2 border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-700">Delete Account</p>
            <p className="text-sm text-red-500">
              Once you delete your account, there is no going back.
            </p>
          </div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
