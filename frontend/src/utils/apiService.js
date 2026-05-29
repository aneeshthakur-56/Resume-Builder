import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const makeApiRequest = async (
  url,
  method = "GET",
  data = null,
  headers = {},
) => {
  const config = { url, method, data, headers: { ...headers } };

  if (data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  const response = await apiClient(config);
  return response.data;
};

export const triggerDirectDownload = (resumeId) => {
  const existing = document.getElementById(`print-iframe-${resumeId}`);
  if (existing) {
    try {
      document.body.removeChild(existing);
    } catch (e) {
      console.error(e);
    }
  }

  const iframe = document.createElement("iframe");
  iframe.id = `print-iframe-${resumeId}`;
  iframe.style.position = "fixed";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.border = "none";
  iframe.style.bottom = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "-9999";
  iframe.src = `/view/${resumeId}?print=true`;
  
  document.body.appendChild(iframe);
  
  const toastId = toast.loading("Preparing your PDF for download...");

  iframe.onload = () => {
    // The Preview.jsx page inside the iframe handles focusing and calling window.print()
    // once the resume data is fully loaded, ensuring vector-perfect output.
    // The parent just dismisses the loading toast and cleans up the iframe node.
    setTimeout(() => {
      toast.dismiss(toastId);
      
      setTimeout(() => {
        const currentIframe = document.getElementById(`print-iframe-${resumeId}`);
        if (currentIframe) {
          try {
            document.body.removeChild(currentIframe);
          } catch (e) {
            console.error(e);
          }
        }
      }, 15000); // Wait 15s to ensure the print dialogue has fully processed before removal
    }, 2000);
  };
};
