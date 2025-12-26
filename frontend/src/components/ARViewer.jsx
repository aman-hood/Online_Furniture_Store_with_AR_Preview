

const ARViewer = ({ modelUrl, onClose }) => {
  if (!modelUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f5f5f5]">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full"
      >
        Close
      </button>

      <model-viewer
        src={modelUrl}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <button
          slot="ar-button"
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "14px 24px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "999px",
            border: "none",
          }}
        >
          View in your space
        </button>
      </model-viewer>
    </div>
  );
};

export default ARViewer;
