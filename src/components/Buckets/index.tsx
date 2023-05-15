'use client'

import { getBuckets, getObjects } from "../client"
import { GRPC_URL } from '../config/env';
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { matches } from 'src/utils/embedding'
import styles from './Bucket.module.css';

export const Bucket = () => {
    const { address } = useAccount()
    const [buckets, setBuckets] = useState<Array<{
        name: string, created: string
    }> | undefined>()
    const [bucket, setBucket] = useState('')
    const [objects, setObjects] = useState<Array<{
        name: string, type: string, size: string, created: string
    }> | undefined>()
    const [searchResults, setSearchResults] = useState<Array<{ name: string, type: string, size: string, created: string }> | undefined>()
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (bucket) {
            getObjects(GRPC_URL, bucket).then((o) => {
                const objectInfos = o.objectInfos
                let tempObjects = objects || []; // Create a temporary array
                objectInfos.map((objectInfo) => {
                    tempObjects.push({
                        name: objectInfo.objectName,
                        type: objectInfo.contentType,
                        size: ((objectInfo.payloadSize).div(1000000)).toString(),
                        created: (objectInfo.createAt).toString()
                    }); // Push the object names into the temporary array
                })
                setObjects(tempObjects); // Set the state once with the updated array
            })
        }
    }, [bucket])

    useEffect(() => {
        getBuckets(GRPC_URL).then((b) => {
            const bucketInfos = b.bucketInfos
            let tempBuckets = buckets || []; // Create a temporary array
            bucketInfos.map((bucketInfo) => {
                if (bucketInfo.owner === address) {
                    tempBuckets.push({
                        name: bucketInfo.bucketName,
                        created: (bucketInfo.createAt).toString()
                    }); // Push the bucket names into the temporary array
                }
            })
            setBuckets(tempBuckets); // Set the state once with the updated array
        })        
    }, [address])

    const handleSearch = async () => {
        const m = await matches(searchText, objects!)
        setSearchResults([m[0].file])
    }

    const getDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp))
        return date.toLocaleDateString()
    }

    return (
        <div>
            {
                bucket ? (
                    <div className={styles.searchContainer}>
                        <div>
                            <input type="search" placeholder="Search objects" onChange={
                                (e) => {
                                    setSearchText(e.target.value)
                                }
                            } />
                            <button onClick={async (e) => {
                                e.preventDefault()
                                await handleSearch()
                            }}>
                                Search
                            </button>
                            {searchResults && (
                            <ul>
                                {searchResults.map((result, index) => (
                                    <li key={index}>{result.name}</li>
                                ))}
                            </ul>
                        )}
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    {/* <th>Created</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {objects && objects.map((object, index) => (
                                    <tr key={index}>
                                        <td>{object.name}</td>
                                        <td>{object.type}</td>
                                        <td>{object.size}mb</td>
                                        {/* <td>{getDate(object.created)}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <div>
                    <h2>Buckets</h2>
                    <div className={styles.container}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    {/* <th>Created</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {buckets?.map((b, index) => (
                                    <tr key={index} onClick={() => { setBucket(b.name) }}>
                                        <td>{b.name}</td>
                                        {/* <td>{getDate(b.created)}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}