import Button from "@/components/shared/Button";
import api from "@/services/api";
import { debugLog } from "@/utils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const EmailVerified = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-xl bg-foreground p-5 shadow md:w-[440px]">
      <div className="text-2xl text-success">
        <FaCheckCircle />
      </div>
      <div>
        <h3 className="text-lg text-text-foreground">
          Your email has been successfully verified!
        </h3>
      </div>

      <Button type="submit" variant="success">
        <Link to="/sign-in">Sign In Now</Link>
      </Button>
    </div>
  );
};

const EmailNotVerified = ({ error }: { error: string }) => {
  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-xl bg-foreground p-5 shadow md:w-[440px]">
      <div className="text-2xl text-danger">
        <FaExclamationCircle />
      </div>
      <div>
        <h3 className="text-lg text-text-foreground">{error}</h3>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  const { userId, token } = useParams();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${userId}/${token}`);

        if (res.status === 200) {
          setIsVerified(true);
          return;
        } else {
          setError(res.data.message);
        }
        console.log(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message);
        }

        debugLog(error);
      } finally {
        setLoading(false);
      }
    };

    checkEmailVerification();
  }, [userId, token]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background p-5 text-center">
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <h2 className="mb-5 flex items-center gap-2 text-text-foreground">
            Verifying email{" "}
            <MoonLoader size={20} color="var(--color-success)" />
          </h2>
        </div>
      ) : isVerified ? (
        <EmailVerified />
      ) : (
        <EmailNotVerified error={error} />
      )}
    </div>
  );
};

export default VerifyEmailPage;
