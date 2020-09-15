import React, { Component } from "react";
import {
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from "reactstrap";
import Comments from "./addComment"
import ListComments  from "./ListComments"
/**
 * Learn more about reactstrap Card component
 * https://reactstrap.github.io/components/card/
 */
class BookCard extends Component {
    render() {
        const {
            cover_image_url,
            summary,
            title,
            author_name,
            publication_date,
            id
        } = this.props.book;

        return (
            <Col xs="4">
                <Card>
                    <CardImg
                        className="bookCover"
                        src={cover_image_url}
                        alt="Book cover"
                    />
                    <CardBody>
                        <CardTitle>{title}</CardTitle>
                        <CardSubtitle>{author_name}</CardSubtitle>
                        <CardText>
              Book Id:{id}
                        </CardText>
                        <CardText>
                            <i>{publication_date}</i> - {summary}
                        </CardText>
                        <Comments/>
                        <CardText>Comments</CardText>
                        <ListComments  comments={this.props.comments}/>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}



export default BookCard;
