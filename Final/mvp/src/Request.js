import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useForm } from "react-hook-form"



export default function Request() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));

    return (
        <Container>
            <Row>
                <h1>Request</h1>
            </Row>

            <form onSubmit={handleSubmit(onSubmit)}>


                <input name="name" ref={register} placeholder="Name" /><br></br>
                <input name="phonenumber" ref={register} placeholder="Phone Number" /><br></br>
                <input name="arrivaltime" ref={register} placeholder="Arrival Time" /><br></br>
                <input name="departuretime" ref={register} placeholder="Departure Time" /><br></br>
                <input name="reason" ref={register} placeholder="Reason" /><br></br>
                <input name="createdAt" ref={register} placeholder="createdAt" /><br></br>

                <input type="submit" />

            </form>

        </Container>
    )
}