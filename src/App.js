import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //from props injected by redux (look at the bottom)
    //we deconstruct the property we need:
    const { setCurrentUser } = this.props;
    //onAuthStateChanged returns the unsubscribe function for the observer
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if a user loged in:
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //user snapshot updates:
        userRef.onSnapshot(snapshot => {
          //we call the function (property) passed on the props by redux connect method
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    //when called, this function unsubscribe the user:
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInAndSignUp}></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

//here we dont need stateToProps function
//because this component doesnt use the actual state anywhere
//it just sets it
//so first argument is null
export default connect(null, mapDispatchToProps)(App);
