import Modal from "@/components/Modal";
import { useState } from "react";

function PortalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h1>Portal Demo</h1>
            {/* ComponentA */}
            <div onClick={(e) => console.log(e.target)}>
                {/* ComponentB */}
                <div
                    style={{
                        width: 100,
                        height: 100,
                        transform: "scale(1.1)",
                    }}
                >
                    {/* ComponentC */}
                    <div>
                        <Modal
                            isOpen={isOpen}
                            onRequestClose={() => setIsOpen(false)}
                        >
                            Modal Content
                        </Modal>
                        <button onClick={() => setIsOpen(true)}>Open</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortalDemo;
