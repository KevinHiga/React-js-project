import React from 'react';

import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';
import BooksDetails from './BooksDetails';

class BooksDetailsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.bookss.read(this.props.match.params.booksId);
      console.log(data);
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleOpenModal = e => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = e => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteBooks = async e => {
    this.setState({ loading: true, error: null });

    try {
      await api.bookss.remove(this.props.match.params.booksId);
      this.setState({ loading: false });

      this.props.history.push('/bookss');
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return <BooksDetails 
    onCloseModal={this.handleCloseModal}
    onOpenModal={this.handleOpenModal}
    modalIsOpen={this.state.modalIsOpen}
    onDeleteBooks={this.handleDeleteBooks}
    book={this.state.data} />;
  }
}

export default BooksDetailsContainer;
