import { useState, useEffect } from "react";
import { useEditUserMutation } from "@/feature/Admin/adminApi";
import { toast } from "sonner";
import logger from "@/utils/logger";

function EditUserModal({ user, onClose }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phonenumber: "",
        gender: "",
        bio: "",
        birthday: "",
    });

    const [editUser, { isLoading }] = useEditUserMutation();

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name ?? "",
                email: user.email ?? "",
                phonenumber: user.phonenumber ?? "",
                gender: user.gender ?? "",
                bio: user.bio ?? "",
                birthday: user.birthday ? user.birthday.slice(0, 10) : "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editUser({ id: user.id, body: form }).unwrap();
            toast.success("sửa thành công")
            onClose();
        } catch (err) {
            logger.error(err);
            toast.error("Lỗi chưa xác định")
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl w-full max-w-md p-6 flex flex-col gap-5">

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Chỉnh sửa người dùng</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <Field label="Họ tên">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nguyễn Văn A"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Email">
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Số điện thoại">
                        <input
                            name="phonenumber"
                            value={form.phonenumber}
                            onChange={handleChange}
                            placeholder="0901234567"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Giới tính">
                        <select name="gender" value={form.gender} onChange={handleChange} className={inputCls}>
                            <option value="">-- Chọn --</option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </Field>

                    <Field label="Ngày sinh">
                        <input
                            name="birthday"
                            type="date"
                            value={form.birthday}
                            onChange={handleChange}
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Bio">
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Mô tả ngắn..."
                            rows={3}
                            className={inputCls + " resize-none"}
                        />
                    </Field>

                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">{label}</label>
            {children}
        </div>
    );
}

export default EditUserModal;