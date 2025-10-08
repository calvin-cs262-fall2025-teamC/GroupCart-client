import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Favor {
  id: number;
  buyer?: string;
  recipient?: string;
  items: string;
  amount: number;
  date: string;
  completed?: boolean;
  reimbursed?: boolean;
}

export default function FavorsTab() {
  const [favorsOwed, setFavorsOwed] = useState<Favor[]>([
    { id: 1, buyer: 'Sarah', items: 'Eggs (12 ct), Milk', amount: 8.50, date: '10/06/2025', completed: false },
    { id: 2, buyer: 'Mike', items: 'Bread, Butter', amount: 6.25, date: '10/05/2025', completed: false },
    { id: 3, buyer: 'Sarah', items: 'Coffee beans', amount: 12.99, date: '10/03/2025', completed: true }
  ]);

  const [favorsCompleted, setFavorsCompleted] = useState<Favor[]>([
    { id: 4, recipient: 'Mike', items: 'Orange juice, Cereal', amount: 11.75, date: '10/07/2025', reimbursed: false },
    { id: 5, recipient: 'Jamie', items: 'Pasta, Tomato sauce', amount: 7.50, date: '10/04/2025', reimbursed: false },
    { id: 6, recipient: 'Sarah', items: 'Chips', amount: 3.99, date: '10/02/2025', reimbursed: true }
  ]);

  const [notifications, setNotifications] = useState<string[]>([]);

  const toggleFavorOwed = (id: number) => {
    setFavorsOwed(favorsOwed.map(favor => 
      favor.id === id ? { ...favor, completed: !favor.completed } : favor
    ));
  };

  const toggleFavorCompleted = (id: number) => {
    setFavorsCompleted(favorsCompleted.map(favor => 
      favor.id === id ? { ...favor, reimbursed: !favor.reimbursed } : favor
    ));
  };

  const sendReminder = (recipient: string, amount: number) => {
    const message = `Reminder sent to ${recipient} for $${amount.toFixed(2)}`;
    setNotifications([...notifications, message]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(msg => msg !== message));
    }, 3000);
  };

  const totalOwed = favorsOwed
    .filter(f => !f.completed)
    .reduce((sum, f) => sum + f.amount, 0);

  const totalToReceive = favorsCompleted
    .filter(f => !f.reimbursed)
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favors</Text>
        <View style={styles.totalsContainer}>
          <Text style={styles.totalOwed}>You owe: ${totalOwed.toFixed(2)}</Text>
          <Text style={styles.totalToReceive}>Owed to you: ${totalToReceive.toFixed(2)}</Text>
        </View>
      </View>

      {notifications.length > 0 && (
        <View style={styles.notificationContainer}>
          {notifications.map((msg, i) => (
            <Text key={i} style={styles.notificationText}>{msg}</Text>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>You Owe</Text>
        {favorsOwed.map(favor => (
          <View 
            key={favor.id} 
            style={[
              styles.card,
              favor.completed ? styles.cardCompleted : styles.cardOwed
            ]}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardName}>{favor.buyer} bought for you</Text>
                <Text style={styles.cardItems}>{favor.items}</Text>
                <Text style={styles.cardDate}>{favor.date}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.amountOwed}>${favor.amount.toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => toggleFavorOwed(favor.id)}
            >
              <View style={styles.checkbox}>
                {favor.completed && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                {favor.completed ? 'Reimbursed' : 'Mark as reimbursed'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>You Completed</Text>
        {favorsCompleted.map(favor => (
          <View 
            key={favor.id} 
            style={[
              styles.card,
              favor.reimbursed ? styles.cardCompleted : styles.cardCompleted2
            ]}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardName}>You bought for {favor.recipient}</Text>
                <Text style={styles.cardItems}>{favor.items}</Text>
                <Text style={styles.cardDate}>{favor.date}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.amountToReceive}>${favor.amount.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => toggleFavorCompleted(favor.id)}
              >
                <View style={styles.checkbox}>
                  {favor.reimbursed && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  {favor.reimbursed ? 'Reimbursed' : 'Mark as reimbursed'}
                </Text>
              </TouchableOpacity>
              {!favor.reimbursed && (
                <TouchableOpacity 
                  style={styles.remindButton}
                  onPress={() => sendReminder(favor.recipient!, favor.amount)}
                >
                  <Ionicons name="notifications-outline" size={16} color="#fff" />
                  <Text style={styles.remindButtonText}>Remind</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  totalsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  totalOwed: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
  totalToReceive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
  notificationContainer: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  notificationText: {
    color: '#1e40af',
    fontSize: 14,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
  },
  cardOwed: {
    borderColor: '#fee2e2',
  },
  cardCompleted: {
    opacity: 0.5,
    borderColor: '#e5e7eb',
  },
  cardCompleted2: {
    borderColor: '#dcfce7',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLeft: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardItems: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  cardRight: {
    justifyContent: 'flex-start',
    marginLeft: 8,
  },
  amountOwed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  amountToReceive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remindButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  remindButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
