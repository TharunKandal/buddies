import React, { Component } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import "./index.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import List from "./../ListItems/index";

interface IProps {}
interface Istate {
  friends?: any;
  list?: any;
  pages?: number;
  selectedPage: number;
  pagelist?: any[];
}
export default class ListComponent extends Component<IProps, Istate> {
  refNameRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);

    this.state = {
      friends: [
        { name: "Jhon", isFav: true },
        { name: "Tony", isFav: true },
        { name: "Ezikial", isFav: false },
        { name: "Robert", isFav: true },
        { name: "Davinci", isFav: true },
        { name: "Michael", isFav: false },
        { name: "Timmy", isFav: false },
        { name: "Susan", isFav: true },
        { name: "Holly", isFav: true },
        { name: "Maya", isFav: false },
      ],
      list: [],
      pages: 0,
      pagelist: [],
      selectedPage: 0,
    };
    this.refNameRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.state.selectedPage);
    this.setState(
      {
        list: this.state.friends
          .sort((x: any, y: any) => {
            return x.isFav === y.isFav ? 0 : x.isFav ? -1 : 1;
          })
          .slice(this.state.selectedPage * 4, this.state.selectedPage * 4 + 4),
        pages: Math.ceil(this.state.friends.length / 4),
      },
      () => {
        let arr = [];
        if (this.state.pages) {
          for (let i = 0; i < this.state.pages; i++) {
            // const element = array[i];
            arr.push(
              <a
                href="#"
                key={i}
                onClick={() => {
                  this.setState({ selectedPage: i }, () => {
                    this.setState({
                      list: this.state.friends
                        .sort((x: any, y: any) => {
                          return x.isFav === y.isFav ? 0 : x.isFav ? -1 : 1;
                        })
                        .slice(
                          this.state.selectedPage * 4,
                          this.state.selectedPage * 4 + 4
                        ),
                    });
                  });
                }}
              >
                {i}
              </a>
            );
          }
        }
        this.setState({ pagelist: arr });
        // console.log(this.state.pagelist);
      }
    );
  }

  handleKeyPress = (e: any) => {
    // console.log(e.target.value);
    if (e.key == "Enter" && e.target.value != "") {
      this.setState(
        {
          friends: [
            { name: e.target.value, isFav: false },
            ...this.state.friends,
          ],
        },
        () => {
          this.setState({
            list: this.state.friends
              .sort((x: any, y: any) => {
                return x.isFav === y.isFav ? 0 : x.isFav ? -1 : 1;
              })
              .slice(
                this.state.selectedPage * 4,
                this.state.selectedPage * 4 + 4
              ),
          });
          if (this.refNameRef.current) {
            this.refNameRef.current.value = "";
          }
        }
      );
    }
  };
  handleOnChange = (e: any) => {
    this.setState({
      list: this.state.friends
        .filter((friend: any) => {
          return friend.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
        .slice(this.state.selectedPage, this.state.selectedPage + 4),
    });
  };
  handleDelete = (friend: any) => {
    // console.log(e.key);
    if (window.confirm("Press a button!")) {
      this.setState(
        {
          friends: this.state.friends.filter((item: any) => item !== friend),
          list: this.state.friends
            .filter((item: any) => item !== friend)
            .sort((x: any, y: any) => {
              return x.isFav === y.isFav ? 0 : x.isFav ? -1 : 1;
            })
            .slice(
              this.state.selectedPage * 4,
              this.state.selectedPage * 4 + 4
            ),
        },
        () => {
          this.setState({
            pages: Math.ceil(this.state.list.length / 4),
          });
        }
      );
    } else {
    }
  };
  handleFavorite = (friend: any) => {
    console.log(friend);
    let list = this.state.friends.map((obj: any) => {
      return obj.name == friend.name
        ? { name: friend.name, isFav: !friend.isFav }
        : obj;
    });
    // console.log(list);
    this.setState({
      friends: list,
      list: list.sort((x: any, y: any) => {
        return x.isFav === y.isFav ? 0 : x.isFav ? -1 : 1;
      }),
    });
  };

  render() {
    return (
      <div className="list-container">
        <div className="list-card">
          <header>
            <div className="header-title">
              <h3>Friends</h3>
            </div>
            <div className="input-search">
              <input
                type="text"
                placeholder="Enter your Friend Name..."
                onKeyDown={this.handleKeyPress}
                onChange={this.handleOnChange}
                ref={this.refNameRef}
              />
              {/* <FontAwesomeIcon
                className="search-icon"
                icon={faSearch}
                size="lg"
              /> */}
            </div>
          </header>
          <div className="list-div">
            {this.state.list.length ? (
              <List
                friends={this.state.list}
                handleDelete={this.handleDelete}
                handleFavorite={this.handleFavorite}
              ></List>
            ) : (
              <>
                <h5 style={{ color: "yellow" }}>No Friends in here!!</h5>
              </>
            )}
          </div>
          <div className="pagination">
            <a href="#">&laquo;</a>
            {this.state.pagelist}
            {/* <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a> */}
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div>
    );
  }
}
