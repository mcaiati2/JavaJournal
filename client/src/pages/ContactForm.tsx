import React, { useState } from "react";

function ContactForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error] = useState('');
    const [result, setResult] = useState('');

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setResult("Sending....");

        const formData = new FormData(event.target as HTMLFormElement);
        formData.append("access_key", "9ab91f56-4fff-40ad-8bc9-6a326418c729");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Your message has been sent");
            setFirstName('');
            setLastName('');
            setEmail('');
            setMessage('');
            (event.target as HTMLFormElement).reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className="contact-us-image">
            <h2 className="brown-text contact-header">Let's Get In Touch</h2>
            <div className="d-flex justify-content-center align-items-center mb-5">
                <form onSubmit={onSubmit} className="thin-rounded-outline p-4 white-text shadow image-opacity" style={{ width: '600px' }}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            name="email"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div id="emailHelp" className="form-text">Your email is safe with us! </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold" >What's brewing?!</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            name="message"
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <button type="submit" className="submit-btn">Send Message</button>
                    <div>{result}</div>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;