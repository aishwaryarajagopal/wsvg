"""
command line usage: python getOrganismInfo.py WhaleShark(or any other oragnism name - folder containing all fasta files for that species)

output: json file of the name: WhaleShark.json (when input folder is WhaleShark) containing names and sequence lengths of all genes in the folder

NOTE: make sure the fasta files don't have extra space/lines in the end 

"""
import sys
import os

basepath = sys.argv[1]
allDirs = os.listdir(sys.argv[1])


opt = []

for d in allDirs:
	print("--------------------")
	count=0
	dPath = os.path.join(basepath, d)
	# Find if this is a directory
	if (os.path.isdir(dPath)):
		print(dPath)
		# Get all of the file names in this directory
		allFiles = os.listdir(dPath)
		genes = []
		length = 0
		for f in allFiles:
			# Only read out the files that are FASTA and not the name of the species
			if(f.endswith(".fa") and not f.startswith(d)):
				fastaPath = os.path.join(dPath, f)
				print(fastaPath)
				fasta = open(fastaPath)
				allLines = fasta.readlines();
				fasta.close()
				ignoreFirst = 1
				count = 0
				seq = ""
				for line in allLines:
					if ignoreFirst == 1:
						ignoreFirst = 0
						continue
					if len(line) == 0:
						continue
					count += len(line)
					seq = seq + line.strip()
				print(count)
				print(seq)
				length += count
				genes.append({"name":f.replace(".fa","").upper(),"path":fastaPath,"sequence":seq,"length":count})
		opt.append({"name":d,"path":dPath,"genes":genes, "length":length, "numGenes":len(genes)})
	#f = open(sys.argv[1]+"/"+f,"r")
	#allLines = f.readlines()
	#f.close()
	#ignoreLine = 1
	#for line in allLines:
		#if ignoreLine==1:
			#ignoreLine=0
			#continue
		#if len(line)==0:
			#continue
		#print(len(line))
		#count+=len(line)
		
	#opt.append({"file":sys.argv[1]+"/"+curFile,"length":count-len(allLines)+2})
	#print(count-len(allLines)+2)
	#print("--------------------")

import json
with open(sys.argv[1]+".json", 'w') as outfile:
  json.dump(opt, outfile,indent=0)

outfile.close()