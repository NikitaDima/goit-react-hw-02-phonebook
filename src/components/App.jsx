import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHendler = newContacts => {
    const { contacts } = this.state;
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === newContacts.name.toLowerCase()
    );
    if (isNameExists) {
      alert(`${newContacts.name}is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHendler}></ContactForm>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />

          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
