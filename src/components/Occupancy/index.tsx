import styles from "./occupancy.module.css";

interface OccupancyProps {
  title: string;
  occupancy: number;
  capacity: number;
}

const Occupancy = ({ title, occupancy, capacity }: OccupancyProps) => {
  const percentage = (occupancy / capacity) * 100;
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray * ((100 - percentage) / 100);
  const isHighOccupancy = percentage >= 85;
  
  return (
    <div className={styles.indicator}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.circularIndicator}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            className={styles.backgroundCircle}
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="10"
          />
          <circle
             className={`${styles.progressCircle} ${isHighOccupancy ? styles.highOccupancy : ""}`}
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#4caf50"
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
          />
          <text
            x="60"
            y="60"
            textAnchor="middle"
            dy=".3em"
            className={styles.percentageText}
          >
            {percentage.toFixed(0)} %
          </text>
        </svg>
      </div>
      <div className={styles.digital}>
        {occupancy} / {capacity}
      </div>
    </div>
  );
};

export default Occupancy;
