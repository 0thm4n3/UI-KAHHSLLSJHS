/*
  # Remove Resources Table and Related Objects

  This migration removes:
  1. Resources table and its dependencies
  2. Related functions
  3. Sequences
  4. Policies

  Using CASCADE to properly handle dependencies.
*/

-- Drop table with CASCADE to handle all dependencies
DROP TABLE IF EXISTS resources CASCADE;

-- Drop sequence (should be safe now that the table is gone)
DROP SEQUENCE IF EXISTS resource_id_seq;