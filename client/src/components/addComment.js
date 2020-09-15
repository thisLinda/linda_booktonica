import React from "react";
import {
    Form,
    FormGroup,
    Input,
    Button,
    Card
} from "reactstrap";

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={comments:[],userId:"",addComment:"",bookId:""};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handleText=this.handleText.bind(this);
        this.handleBookId=this.handleBookId.bind(this);
    }
   
    handleSubmit(e){
        console.log("enter key success");
        e.preventDefault();
        fetch("/comments",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "text":this.refs.text.value,
                "id":this.refs.id.value,
                "bId":this.refs.bId.value
            })
        });
        window.location.reload(false);
    }

    handleUserName(e){
        this.setState({userId:e.target.value});
    }
    handleBookId(e){
        this.setState({bookId:e.target.value});
    }
    handleText(e){
        this.setState({addComment:e.target.value});
    }
    render(){
   
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="textarea" value={this.state.addComment} placeholder={"place your comment here"} onChange={this.handleText} name="text" ref="text" maxLength={100}/><br/>
                       
                        <Input type="number" value={this.state.userId} onChange={this.handleUserName} placeholder={"user id"}name="id" ref="id"/>
                        <Input type="number" value={this.state.bookId} onChange={this.handleBookId} placeholder={"book id"} name="bId" ref="bId"/>
                  
                        <div className="wordCount">
                        character: {this.state.addComment.length}
                            {this.state.addComment.length>100? " is over the limit":null}
                        </div>
                        <Card>
                            <Button size="sm" type="submit">Add Comment</Button>
                        </Card>
                    </FormGroup>
                </Form>        
            </div>
        );
    }
}

export default Comments;