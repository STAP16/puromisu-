import styles from "./PromiseCard.module.css";

export default function PromiseCard({ date, description }) {
  return (
    <article
      className={styles.card}
      tabIndex={0}
      aria-label={`Promise created on ${date}`}
    >
      <svg
        className={styles.bgOrbits}
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#6ad3ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#b98eff" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#g1)" strokeWidth="1">
          <ellipse
            cx="300"
            cy="200"
            rx="220"
            ry="90"
            className={styles.orbit1}
          />
          <ellipse
            cx="300"
            cy="200"
            rx="160"
            ry="65"
            className={styles.orbit2}
          />
          <ellipse
            cx="300"
            cy="200"
            rx="100"
            ry="42"
            className={styles.orbit3}
          />
        </g>
        <g className={styles.stars}>
          <circle cx="44" cy="32" r="1.8" />
          <circle cx="522" cy="48" r="1.2" />
          <circle cx="130" cy="290" r="1.6" />
          <circle cx="480" cy="180" r="1.4" />
        </g>
      </svg>

      <div className={styles.header}>
        <time className={styles.date} dateTime={date}>
          {date}
        </time>
        <div className={styles.pulse} aria-hidden />
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.footer} aria-hidden>
        <span className={styles.tag}>🚀 Premium</span>
        <span className={styles.spark} />
      </div>
    </article>
  );
}
