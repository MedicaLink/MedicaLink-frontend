import patientImage from "../../assets/img/patients/patient.png";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";

interface CommentSectionProps {
    className: string
}

export default function CommentSection({ className }: CommentSectionProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const comments = [
        { id: 1, comment: 'The staff at this hospital were incredibly kind and attentive. I felt well cared for during my stay.', date: '10/12/2022 10:05', img: 'public/profile/p8.jpg'},
        { id: 2, comment: 'My doctor took the time to explain my condition and treatment options thoroughly. Very satisfied with the service!', date: '10/12/2022 10:05', img: 'public/profile/p5.jpg'},
        { id: 3, comment: 'The nursing staff were exceptional and made my recovery process much smoother. Thank you!', date: '10/12/2022 10:05', img: 'public/profile/p4.jpg'}
    ]

    return (
        <div className={`comment-list ${className}`}>

            {
                isLoading? (
                    Array.from({ length: 3 }).map((item, index: number) => {
                        return (
                            <div className="comment mb-2" key={index}>
        
                                <Skeleton variant="circular" sx={{marginRight:'20px'}} width={'50px'} height={'50px'} />
        
                                <p>
                                    <Skeleton variant="text" sx={{fontSize: '1rem'}} width={260} />
                                    <Skeleton variant="text" sx={{fontSize: '0.8rem'}} width={200} />
                                </p>
                                <div className="controls ms-auto d-none d-md-block">
                                    <Skeleton variant="text" sx={{fontSize: '0.6rem', marginBottom: '5px'}} width={70} />
                                    <button>
                                        <span className="material-symbols-outlined">
                                            send
                                        </span>
                                    </button>
                                </div>
        
                            </div>
                        );
                    })
                ) : (
                    comments.map(comment => {
                        return (
                            <div className="comment mb-2" key={comment.id}>
        
                                <img src={comment.img} alt="profile-image" />
        
                                <p>
                                    {comment.comment}
                                </p>
                                <div className="controls">
                                    <span className="mb-2">{comment.date}</span>
                                    <button>
                                        <span className="material-symbols-outlined">
                                            send
                                        </span>
                                    </button>
                                </div>
        
                            </div>
                        );
                    })
                )
            }

        </div>
    );
}