import styles from './Buckets.module.css';
import btn from ',,/Wallet/Connect.module.css';
import { useState } from 'react';

export function CreateBucket() {
    const [buckets, setBuckets] = useState([])

    if (buckets.length === 0) {
        return (
            <div className={styles.container}>
                <h2>Buckets</h2>
                <button className={btn.button}>
                    Create Bucket
                </button>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <h2>Buckets</h2>
            {
                buckets.map((bucket, index) => {
                    return (
                        <div key={index} className={styles.bucket}>
                            {/* <div className={styles.bucketName}>{bucket.name}</div>
                            <div className={styles.bucketAddress}>{bucket.address}</div> */}
                        </div>
                    )
                })
            }
        </div>
    )
}