import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import slugify from "slugify";

import fakeData from "./fakeData";
import css from "./PostDetail.module.scss";
import { useLocation } from "react-router";

const styles = {
    container: {
        background: "#f0f0f0",
        padding: 20,
    },
    inner: {
        display: "flex",
        gap: 20,
    },
    content: {
        marginRight: 350,
        overflow: "hidden",
    },
};

function PostDetail() {
    const location = useLocation();
    const [indexList, setIndexList] = useState([]);
    const contentRef = useRef();

    useEffect(() => {
        if (!fakeData) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const oldActive = document.querySelector(
                        `#index-list a.${css.active}`
                    );
                    if (oldActive) oldActive.classList.remove(css.active);

                    const indexTarget = document.querySelector(
                        `#index-list a[href="#${entry.target.id}"]`
                    );
                    if (indexTarget) {
                        indexTarget.classList.add(css.active);
                    }
                }
            });
        });

        const indexList = [];

        const headings =
            contentRef.current.querySelectorAll("h2, h3, h4, h5, h6");
        headings.forEach((heading, index) => {
            const Tag = heading.nodeName.toLowerCase();
            const originalText = heading.textContent;
            const slug = slugify(originalText, {
                lower: true,
                remove: /[*+~.()'"!:@?]/g,
            }).replace(/^[\d-]+/, "");

            heading.id = slug;

            const link = document.createElement("a");
            link.href = `#${slug}`;
            link.textContent = originalText;

            heading.innerHTML = "";
            heading.appendChild(link);

            observer.observe(heading);

            indexList.push(
                <Tag key={index} className={Tag}>
                    <a href={`#${slug}`}>{originalText}</a>
                </Tag>
            );
        });

        setIndexList(indexList);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!indexList.length) return;

        const target = location.hash && document.querySelector(location.hash);
        if (target) {
            target.scrollIntoView();
        }
    }, [indexList, location]);

    return (
        <div style={styles.container}>
            <h1>Post Detail</h1>

            <div style={styles.inner}>
                {/* Content */}
                <div
                    ref={contentRef}
                    style={styles.content}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(fakeData),
                    }}
                ></div>

                {/* Index */}
                {indexList.length && (
                    <div id="index-list" className={css.index}>
                        {indexList}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetail;
