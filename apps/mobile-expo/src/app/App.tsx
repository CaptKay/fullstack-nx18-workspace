import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import type { Project } from '@fullstack-nx18-workspace/domain-model';
import { fetchProjects } from '@fullstack-nx18-workspace/api-client';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchProjects();
        if (mounted) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load projects (mobile):', err);
        if (mounted) {
          setError('Could not load projects. Please try again.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fullstack Nx18 Workspace – Mobile Projects</Text>

      {loading && <ActivityIndicator size="large" />}

      {error && !loading && (
        <Text style={styles.error}>{error}</Text>
      )}

      {!loading && !error && (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              {/* description may be optional; guard it */}
              {item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}
              <Text style={styles.meta}>
                Status: {item.status} • Created: {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#020617',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 16,
  },
  error: {
    color: '#f97316',
    marginTop: 8,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#cbd5f5',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
