import { supabase } from '../lib/supabase';

// Projects
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_members (
        member_id,
        team_members (*)
      )
    `);
  
  if (error) throw error;
  return data;
};

// Team Members
export const getTeamMembers = async () => {
  console.log('Fetching team members...');
  const { data, error } = await supabase
    .from('team_members')
    .select('*', { count: 'exact' })
    .order('name');
  
  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
  
  console.log('Total team members found:', data?.length);
  console.log('Team members data:', data);
  
  if (!data) {
    console.warn('No team members data returned');
    return [];
  }

  return data;
};

export const createTeamMember = async (member: {
  name: string;
  role: string;
  email: string;
  avatar?: string;
}) => {
  console.log('Creating team member:', member);
  const { data, error } = await supabase
    .rpc('create_team_member', {
      p_name: member.name,
      p_role: member.role,
      p_email: member.email,
      p_avatar: member.avatar
    });
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  console.log('Team member created:', data);
  return data;
};

export const updateTeamMember = async (
  id: string,
  member: {
    name: string;
    role: string;
    email: string;
    avatar?: string;
  }
) => {
  console.log('Updating team member:', id, member);
  const { data, error } = await supabase
    .rpc('update_team_member', {
      p_id: id,
      p_name: member.name,
      p_role: member.role,
      p_email: member.email,
      p_avatar: member.avatar
    });
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  console.log('Team member updated:', data);
  return data;
};

export const deleteTeamMember = async (id: string) => {
  const { error } = await supabase
    .rpc('delete_team_member', {
      p_id: id
    });
  
  if (error) throw error;
};

// Vulnerabilities
export const getVulnerabilities = async () => {
  const { data, error } = await supabase
    .from('vulnerabilities')
    .select(`
      *,
      vulnerability_assets (
        asset_id,
        assets (*)
      ),
      team_members (*)
    `);
  
  if (error) throw error;
  return data;
};

// Assets
export const getAssets = async () => {
  const { data, error } = await supabase
    .from('assets')
    .select(`
      *,
      vulnerability_assets (
        vulnerability_id,
        vulnerabilities (*)
      )
    `);
  
  if (error) throw error;
  return data;
};

// Tasks
export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      team_members (*)
    `);
  
  if (error) throw error;
  return data;
};

// Activities
export const getActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      team_members (*)
    `)
    .order('timestamp', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data;
};