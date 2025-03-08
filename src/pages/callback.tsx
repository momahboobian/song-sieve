import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CallbackPage = () => {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.code) {
      setCode(router.query.code as string);
    }
  }, [router.query.code]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {code ? (
        <div>
          <h1>Authorization Code:</h1>
          <pre
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-wrap", // Add this line for wrapping
              maxWidth: "80%",
              margin: "20px auto",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {code}
          </pre>
          <p>You can now use this code to request an access token.</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CallbackPage;
