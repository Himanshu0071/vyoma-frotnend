"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  ShieldCheck,
  UserPlus,
  Trash2,
} from "lucide-react";

import axios from "axios";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUsersPage() {
  const [loading, setLoading] =
    useState(false);

  const [users, setUsers] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "admin",
    });

  /* =========================
     FETCH USERS
  ========================= */

  const fetchUsers =
    async () => {
      try {
        const response =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users`
          );

        setUsers(
          response.data
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to fetch users"
        );
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /* =========================
     CREATE ADMIN
  ========================= */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          formData
        );

        toast.success(
          "Admin created successfully"
        );

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "admin",
        });

        fetchUsers();
      } catch (error: any) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to create admin"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================
     DELETE USER
  ========================= */

  const handleDelete =
    async (id: string) => {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
        );

        toast.success(
          "User deleted"
        );

        fetchUsers();
      } catch (error) {
        console.log(error);

        toast.error(
          "Delete failed"
        );
      }
    };

  /* =========================
     FILTER USERS
  ========================= */

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Users & Admins
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Manage users and admin accounts
        </p>
      </div>

      {/* CREATE ADMIN */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <ShieldCheck
              size={18}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Create Admin
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Add new ERP administrators
            </p>
          </div>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="grid md:grid-cols-4 gap-4"
        >
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="h-11 bg-white/5 border-white/10 text-sm"
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="h-11 bg-white/5 border-white/10 text-sm"
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="h-11 bg-white/5 border-white/10 text-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-sm font-medium flex items-center justify-center gap-2"
          >
            <UserPlus
              size={16}
            />

            {loading
              ? "Creating..."
              : "Create Admin"}
          </button>
        </form>
      </div>

      {/* USERS TABLE */}
      <div className="flex-1 min-h-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* TOP BAR */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            All Users
          </h2>

          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-[260px] h-10 bg-white/5 border-white/10 text-sm"
          />
        </div>

        {/* TABLE */}
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader className="bg-white/[0.03] sticky top-0 z-10">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-xs uppercase text-gray-400">
                  Name
                </TableHead>

                <TableHead className="text-xs uppercase text-gray-400">
                  Email
                </TableHead>

                <TableHead className="text-xs uppercase text-gray-400">
                  Role
                </TableHead>

                <TableHead className="text-xs uppercase text-gray-400">
                  Joined
                </TableHead>

                <TableHead className="text-xs uppercase text-gray-400">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map(
                (user) => (
                  <TableRow
                    key={
                      user._id
                    }
                    className="border-white/5 hover:bg-white/[0.02]"
                  >
                    {/* NAME */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#7C8CFF] to-[#C084FC] flex items-center justify-center text-sm font-semibold">
                          {user.name?.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {
                              user.name
                            }
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            ID:{" "}
                            {user._id.slice(
                              -6
                            )}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* EMAIL */}
                    <TableCell className="text-sm">
                      {
                        user.email
                      }
                    </TableCell>

                    {/* ROLE */}
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role ===
                          "admin"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {
                          user.role
                        }
                      </span>
                    </TableCell>

                    {/* DATE */}
                    <TableCell className="text-sm text-gray-400">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

                    {/* ACTION */}
                    <TableCell>
                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500 transition flex items-center justify-center text-red-400 hover:text-white"
                      >
                        <Trash2
                          size={15}
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}