import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [Mail, setmail] = useState("");
  const [Password, setpassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      Mail: Mail,
      Password: Password,
    });
    if (result.ok) {
      router.replace("/");
    }
  };

  return (
    <div className="mm12">
      <div className="center">
        <div className="container12">
          <div className="text12">Login Form</div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="data12">
              <label>Email or Phone</label>
              <input
                type="text12"
                required
                onChange={(e) => setmail(e.target.value)}
              />
            </div>
            <div className="data12">
              <label>Password</label>
              <input
                type="password"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="btn12">
              <div className="inner"></div>
              <button type="submit">login</button>
            </div>
            <div className="signup-link">
              Not a member? <a href="Signup">Signup now</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
