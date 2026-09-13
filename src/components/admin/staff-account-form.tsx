"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, LoaderCircle, UserPlus } from "lucide-react";
import {
  createSuperAdminAction,
  type StaffFormState,
} from "@/app/admin/staff-actions";
import { adminTw } from "@/components/admin/admin-tailwind";

export function StaffAccountForm() {
  const [state, action, pending] = useActionState<StaffFormState, FormData>(
    createSuperAdminAction,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="border border-[#d4d5ce] bg-[#fffefb]">
      <div className={adminTw.formHeading}>
        <div>
          <h2>Create super admin</h2>
          <p>Add a trusted staff member with full administrative access.</p>
        </div>
      </div>

      <div className="grid gap-5 p-7 max-[720px]:p-5">
        <label className="grid gap-2 text-[13px] font-bold text-[#33473e]">
          Name <span className={adminTw.required}>Required</span>
          <input
            autoComplete="name"
            className="min-h-12 border border-[#c7cac3] bg-white px-[13px] py-[11px] text-sm font-normal text-[#17251f] outline-none focus:border-[#153c2e] focus:shadow-[0_0_0_2px_rgba(21,60,46,.12)]"
            name="name"
            placeholder="Full name"
            required
          />
        </label>

        <label className="grid gap-2 text-[13px] font-bold text-[#33473e]">
          Email address <span className={adminTw.required}>Required</span>
          <input
            autoComplete="email"
            className="min-h-12 border border-[#c7cac3] bg-white px-[13px] py-[11px] text-sm font-normal text-[#17251f] outline-none focus:border-[#153c2e] focus:shadow-[0_0_0_2px_rgba(21,60,46,.12)]"
            name="email"
            placeholder="name@islingtoncollege.edu.np"
            required
            type="email"
          />
        </label>

        <label className="grid gap-2 text-[13px] font-bold text-[#33473e]">
          Password <span className={adminTw.required}>Minimum 8 characters</span>
          <span className="relative block">
            <input
              autoComplete="new-password"
              className="min-h-12 w-full border border-[#c7cac3] bg-white py-[11px] pl-[13px] pr-12 text-sm font-normal text-[#17251f] outline-none focus:border-[#153c2e] focus:shadow-[0_0_0_2px_rgba(21,60,46,.12)]"
              minLength={8}
              name="password"
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center border-0 bg-transparent text-[#68756f] hover:text-[#153c2e] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#153c2e]"
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" size={18} />
              ) : (
                <Eye aria-hidden="true" size={18} />
              )}
            </button>
          </span>
        </label>
      </div>

      {state?.error && (
        <p className="mx-7 mb-2 border border-[#d9aaa6] bg-[#f6e9e7] px-4 py-[13px] text-[13px] text-[#8a2c25] max-[720px]:mx-5" role="alert">
          {state.error}
        </p>
      )}

      <footer className="flex justify-end border-t border-[#d4d5ce] px-7 py-5 max-[720px]:px-5">
        <button
          className="inline-flex min-h-12 cursor-pointer items-center gap-2 border-0 bg-[#153c2e] px-[18px] text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? (
            <LoaderCircle className={adminTw.spin} size={18} />
          ) : (
            <UserPlus size={18} />
          )}
          {pending ? "Creating account…" : "Create super admin"}
        </button>
      </footer>
    </form>
  );
}
